const express = require('express')
const app = express()
const port = 8080
const cors = require('cors')
const compression = require('compression')
const MongoClient = require('mongodb').MongoClient
// const mongoUri = "mongodb://arayaromero:arayaromero1@ds057862.mlab.com:57862/mlab-vgm-db"
const mongoUri = "mongodb://localhost";
let db = undefined;
var path = require('path');

MongoClient.connect(mongoUri, { useNewUrlParser: true }, (err, client) => {
    if (err) return console.log(err)
    db = client.db('mlab-vgm-db')
    // Start server
    app.listen(port, () => console.log(`VGM API Listening on port: ${port}!`))
})

app.use(express.json({limit: '10mb', extended: true}));
app.use(express.urlencoded({limit: '10mb', extended: true }));
app.use(cors());
app.use(compression());
app.use('/public', express.static(__dirname + '/../client'))
app.use('/player', express.static(__dirname + '/../client/player'))


app.get('/', (req, res) => {
    res.sendFile(path.resolve('client/vgmlistener.html'));
})

app.get('/player', (req, res) => {
    res.sendFile(path.resolve('client/player/index.html'));
})

// GET Consoles json
app.get('/api/consoles', function (req, res) {
    db.collection('consoles').find().toArray((err, result) => {
        if (err) return console.log(err)
        res.json({ result })
    })
})
// GET Consoles json
app.get('/api/get-console-albums?:console', function (req, res) {
    var query = { "name": req.query.console };
    db.collection('consoles').find(query).toArray((err, result) => {
        if (err) return console.log(err)
        res.json({ result })
    })
})
// POST Consoles
app.post('/api/consoles', (req, res) => {
    var query = { "url": req.body.url };
    var updateQuery = { $set : req.body}
    db.collection('consoles').updateOne(query, updateQuery, { upsert: true }, 
        // db.collection('consoles').insertMany(req.body.consoleList, (err, result) => {
        (err, result) => {
        if (err) return console.log(err)
    
        console.log('Consoles list saved to database', result)
        res.json({ result })
        })
})


// GET album by album-url
app.get('/api/albums:album', function (req, res) {
    db.collection('albums').find({ 'album.url': req.params.title}).toArray((err, result) => {
        if (err) return console.log(err)
        res.json({ result })
    })
})

const util = require('util');
const exec = util.promisify(require('child_process').exec);

// GET album from DB or Scrapp it and save to DB
app.get('/api/album', function (req, res) {
    let query = { 'album.url': req.query.album }
    db.collection('albums').find(query).toArray(async (err, result) => {
        if (err) return console.log(err)

        if (result[0])
            res.json({ result })
        else {
            let specFile = 'cypress/integration/scrapping-scripts/getsongs-cy.js'
            let processStr = `npx cypress run --env ALBUM_URL="/game-soundtracks/album/${req.query.album}" --spec "${specFile}"`;
            await require('child_process').exec(processStr, function (error, stdout, stderr) {
                if (!error) {
                    console.log(process.stdout);
                    db.collection('albums').find(query).toArray((err, result) => {
                        if (err) return console.log(err)
                        res.json({ result })
                    })
                }
            });        
        }
    })
})

// GET all albums
app.get('/api/albums', function (req, res) {
    db.collection('albums').find().toArray((err, result) => {
        if (err) return console.log(err)
        res.json({ result })
    })
})

// POST albums, update or insert if not exist
app.post('/api/albums', (req, res) => {
    var query = { "album.url": req.body.album.url };
    var updateQuery = { $set : req.body}
    db.collection('albums').updateOne(query, updateQuery, { upsert: true },
    (err, result) => {
      if (err) return console.log(err)
  
      console.log('Album saved to database', result)
      res.json({ result })
    })
})

// TODO: add users login to implement FAVORITES/STARRED songs

// ADD SONG TO FAVORITES
app.post('/api/add-starred', (req, res) => {
    // 1. Get current favorites
    // 2. Insert new favorite song
    // OR if not exist,
    // 3. Create favorites new entry { uid.favorites }
    debugger
    var query = { "album.url": req.body.song };
    var updateQuery = { $set : req.body}
    db.collection('favorites').updateOne(query, updateQuery, { upsert: true },
    (err, result) => {
      if (err) return console.log(err)
  
      console.log('Album saved to database', result)
      res.json({ result })
    })
})

// // GET ALL FAVORITE SONGS
// app.get('/api/get-starred-songs', function (req, res) {
//     db.collection('favorites').find().toArray((err, result) => {
//         if (err) return console.log(err)
//         res.json({ result })
//     })
// })