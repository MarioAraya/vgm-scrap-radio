const express = require('express')
const router = express.Router()
const getDb = require("../db").getDb;

/**
 * GET Consoles LIST
 */
router.get('/api/consoles', function (req, res) {
    const db = getDb();
    db.collection('consoles').find().toArray((err, result) => {
        if (err) return console.log(err)
        res.json({ result })
    })
})

/**
 * GET Consoles Albums LIST
 */
router.get('/api/get-console-albums?:console', function (req, res) {
    const query = { "name": req.query.console };
    const db = getDb();
    db.collection('consoles').find(query).toArray((err, result) => {
        if (err) return console.log(err)
        res.json({ result })
    })
})

/**
 * POST Consoles SAVE LIST
 */
router.post('/api/consoles', (req, res) => {
    const query = { "url": req.body.url };
    const updateQuery = { $set: req.body }
    const db = getDb();
    db.collection('consoles').updateOne(query, updateQuery, { upsert: true },
    //db.collection('consoles').insertMany(req.body.consoleList, (err, result) => {
        (err, result) => {
            if (err) return console.log(err)
            console.log('Consoles list saved to database', result)
            res.json({ result })
        })
})

module.exports = router;