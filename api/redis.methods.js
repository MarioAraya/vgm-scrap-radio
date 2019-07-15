var Promise = require("bluebird");
const redis = require('redis');
Promise.promisifyAll(redis);

// Create Redis Client
let client = redis.createClient();

client.on('connect', function() { 
    console.log('Connected to Redis !')
})

module.exports = {
    initDB: initDB,
    getFavoriteSongs: getFavoriteSongs,
    saveFavoriteSongs: saveFavoriteSongs,
    deleteFavoriteSongs: deleteFavoriteSongs
}

function getFavoriteSongs(userId) {
    return client.hgetAsync(`${userId}`, "Favorites")
        .then(function(result) {
            console.log('getUserFav result=', result);
            return JSON.parse(result);
        })
        .error(function(err) {
            console.log(err)
            return err;
        })
}

function saveFavoriteSongs(userId, favorites) {
    return client.hmsetAsync(userId, 
        "Favorites",
        JSON.stringify(favorites))
}

function deleteFavoriteSongs(userId) {
    return client.hmsetAsync(userId, 
        "Favorites",
        JSON.stringify({}))
}

function initDB() {
    const firstFavorite = {
        "username" : "ArayaMario",
        "favorites" : [ 
            {
                "album_url" : "shenmue-original-soundtrack",
                "album" : "Shenmue Original Soundtrack",
                "track" : "Cherry Blossom Wind Dance",
                "track_href" : "http://66.90.93.122/ost/shenmue-original-soundtrack/ypvqrcrq/Cherry%20Blossom%20Wind%20Dance.mp3"
            }, 
            {
                "album_url" : "dracula-battle-perfect-selection",
                "album" : "Dracula Battle Perfect Selection",
                "track" : "beginning",
                "track_href" : "http://66.90.93.122/ost/dracula-battle-perfect-selection/wkyqtvze/01%20-%20beginning.mp3"
            }
        ]
    }
    
    return client.hmsetAsync(firstFavorite.username, 
                            "Favorites",
                            JSON.stringify(firstFavorite.favorites))
}