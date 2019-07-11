const express = require('express')
const app = express()
const port = 8080
const cors = require('cors')
const compression = require('compression')

const initDb = require("./db").initDb;

// MongoDB connection 
initDb(function (err) {
    app.listen(port, (err) => {
        if (err) throw err;
        console.log(`VGM API Listening on port: ${port}!`)
    })
});

// Middlewares
app.use(express.json({ limit: '10mb', extended: true }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(cors());
app.use(compression());
app.use('/public', express.static(__dirname + '/../client'))
app.use('/player', express.static(__dirname + '/../client/player'))

// Routes
app.use(require('./routes/favorites.routes'))
app.use(require('./routes/main.routes'))
app.use(require('./routes/redis.routes'))
app.use(require('./routes/consoles.routes'))
app.use(require('./routes/albums.routes'))