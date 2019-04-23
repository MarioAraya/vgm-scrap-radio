const mongoose = require('mongoose');

let AlbumsSchema = mongoose.Schema({
    url: String,
    name: String,
    albums: [{ 
        name: String, 
        url: String
    }],
    size: Number
})

module.exports = AlbumsSchema