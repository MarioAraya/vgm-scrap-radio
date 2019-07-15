var express = require('express')
var router = express.Router()
var redisMethods = require('../redis.methods')

router.get('/test-redis-init', (req, res) => {
    redisMethods.initDB().then(result => {
        res.json('result initDB:' + result)
    });
})
router.get('/test-redis', (req, res) => {
    redisMethods.getUserFav('ArayaMario').then(result => {
        res.json(result)
    }).catch(err => {
        console.error(err)
        res.json({error: 'fallo la wa'})
    })
})

module.exports = router;