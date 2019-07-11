const express = require('express')
const router = express.Router()
const getDb = require("../db").getDb;

router.get('/api/get-favorite-songs', 
    function (req, res) {
        const query = {username:'ArayaMario'}
        const db = getDb();
        db.collection('userfavorites').find(query).toArray((err, result) => {
            if (err) return console.log(err)
            res.json(result[0])
        })
})

router.post('/api/save-favorite-song', 
    (req, res) => {
        const db = getDb();
        const query = {username:'ArayaMario'};
        const updateQuery = { $push : { favorites: req.body}}

        db.collection('userfavorites').updateOne(query, updateQuery, { upsert: true },
            (err, result) => {
                if (err) return console.log(err)
            
                console.log('Album saved to database', result)
                res.json({ result })
                })
})

module.exports = router;