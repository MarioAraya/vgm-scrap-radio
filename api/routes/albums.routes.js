const express = require('express')
const router = express.Router()
const getDb = require("../db").getDb;

// GET album by album-url
router.get('/api/albums:album', function (req, res) {
    const db = getDb();
    db.collection('albums').find({ 'album.url': req.params.title}).toArray((err, result) => {
        if (err) return console.log(err)
        res.json({ result })
    })
})

const util = require('util');
const exec = util.promisify(require('child_process').exec);

// GET album from DB or Scrapp it and save to DB
router.get('/api/album', function (req, res) {
    const query = { 'album.url': req.query.album }
    const db = getDb();
    db.collection('albums').find(query).toArray(async (err, result) => {
        if (err) return console.log(err)

        if (result[0])
            res.json({ result })
        else {
            let specFile = 'cypress/integration/scrapping-scripts/getsongs-cy.js'
            let processStr = `npx cypress run 
                            --no-exit
                            --env ALBUM_URL="/game-soundtracks/album/${req.query.album}" 
                            --spec "${specFile}" `;
                            //--no-exit
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
router.get('/api/albums', function (req, res) {
    const db = getDb();
    db.collection('albums').find().toArray((err, result) => {
        if (err) return console.log(err)
        res.json({ result })
    })
})

// POST albums, update or insert if not exist
router.post('/api/albums', (req, res) => {
    const db = getDb();
    const query = { "album.url": req.body.album.url };
    const updateQuery = { $set : req.body}
    db.collection('albums').updateOne(query, updateQuery, { upsert: true },
    (err, result) => {
      if (err) return console.log(err)
  
      console.log('Album saved to database', result)
      res.json({ result })
    })
})

module.exports = router;