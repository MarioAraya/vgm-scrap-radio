
//TODO: Revisar efectividad de mongoDB y mongoose o bien 
//      usar redis para la cache y para la persistencia tambien

const mongoose = require('mongoose');
var Schema = mongoose.Schema;
let UserFavoritesSchema = mongoose.Schema({
    _id: {type: Schema.Types.ObjectId},
    username: String,
    favorites: [
        {
            album_id: {type: Schema.Types.ObjectId},
            album_name: String,
            song_name: String,
            song_url: String
        }
    ]
})

module.exports = UserFavoritesSchema