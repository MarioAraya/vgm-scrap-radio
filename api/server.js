const express = require('express')
const app = express()
const port = 8080
const cors = require('cors')
const MongoClient = require('mongodb').MongoClient
// const mongoUri = "mongodb://arayaromero:arayaromero1@ds057862.mlab.com:57862/mlab-vgm-db"
const mongoUri = "mongodb://localhost";
let db = undefined;
const bodyParser = require('body-parser');
var path = require('path');

MongoClient.connect(mongoUri, (err, client) => {
    if (err) return console.log(err)
    db = client.db('mlab-vgm-db')
    // Start server
    app.listen(port, () => console.log(`VGM API Listening on port: ${port}!`))
})

app.use(bodyParser());
app.use(cors());
app.use('/public', express.static(__dirname + '/../client'))


app.get('/', (req, res) => {
    res.sendFile(path.resolve('client/vgmlistener.html'));
})

// GET Consoles json
app.get('/api/consoles', function (req, res) {
    db.collection('consoles').find().toArray((err, result) => {
        if (err) return console.log(err)
        res.json({ result })
    })
})
// POST Consoles
app.post('/api/consoles', (req, res) => {
    db.collection('consoles').insertMany(req.body.consoleList, (err, result) => {
      if (err) return console.log(err)
  
      console.log('Consoles list saved to database', result)
      res.json({ result })
    })
})
// PUT Albums array for a specific console
app.post('/api/consoles:album', (req, res) => {
    db.collection('consoles').save(req.body, (err, result) => {
      if (err) return console.log(err)
  
      console.log('Consoloes list saved to database', result)
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
// GET all albums
app.get('/api/albums', function (req, res) {
    db.collection('albums').find().toArray((err, result) => {
        if (err) return console.log(err)
        res.json({ result })
    })
})
// POST albums
app.post('/api/albums', (req, res) => {
    db.collection('albums').save(req.body, (err, result) => {
      if (err) return console.log(err)
  
      console.log('Album saved to database', result)
      res.json({ result })
    })
})