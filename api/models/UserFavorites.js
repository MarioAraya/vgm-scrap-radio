const mongoose = require('mongoose');
var Schema = mongoose.Schema;

let UserFavoritesSchema = mongoose.Schema({
    username: String,
    favorites: [
        {
            album_id: {type: Schema.Types.ObjectId},
            song_name: String,
            song_url: String
        }
    ]
})

module.exports = UserFavoritesSchema