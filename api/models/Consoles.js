const mongoose = require('mongoose');

let ConsoleSchema = mongoose.Schema({
    url: String,
    name: String,
    // Here is the list of albums to display when user navigates
    albums: [{ 
        name: String, 
        url: String
    }]
})

module.exports = ConsoleSchema