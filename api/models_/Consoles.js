const mongoose = require('mongoose');

let ConsoleSchema = mongoose.Schema({
    url: String,
    name: String,
    albums: [{ 
        name: String, 
        url: String
    }]
})

module.exports = ConsoleSchema