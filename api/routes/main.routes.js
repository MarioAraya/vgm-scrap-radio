const express = require('express')
const router = express.Router()
const path = require('path');

router.get('/', (req, res) => {
    res.sendFile(path.resolve('client/vgmlistener.html'));
})

router.get('/player', (req, res) => {
    res.sendFile(path.resolve('client/player/index.html'));
})

module.exports = router;