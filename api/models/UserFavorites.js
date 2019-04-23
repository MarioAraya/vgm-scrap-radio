const mongoose = require('mongoose');

let UserFavoritesSchema = mongoose.Schema({
    user_id: String,
    album_id: String,
    song_id: String
})

module.exports = UserFavoritesSchema