var app = angular.module('VgmListener', [])

app.factory('VgmListenerFactory', ['$http', function($http) {
    // Albumes y Consolas
    let urlGetConsoles = '/api/consoles';
    let urlGetAlbums = '/api/albums'; 
    let urlGetAlbum = '/api/album'; 
    let urlGetAlbumsByConsole = '/api/get-console-albums'
    // Favoritos
    let urlSetFavoriteSong = '/api/save-favorite-song'
    let urlGetFavoriteSongs = '/api/get-favorite-songs'
    
    return {
        getConsoles,
        getAlbumsByConsole,
        getAllAlbums,
        getAlbum,
        setFavoriteSong,
        getFavoriteSongs
    }

    // Get consoles from API
    function getConsoles(){
        return $http.get(urlGetConsoles);
    }

    // GET ALL ALBUMS
    function getAllAlbums() {
        return $http.get(urlGetAlbums)
    }
    // GET albums by console from API
    function getAlbumsByConsole(console){
        return $http.get(urlGetAlbumsByConsole + '?console=' +console);
    }

    // Get album album from API
    function getAlbum(album){
        return $http.get(urlGetAlbum + '?album=' +album)
    }

    // Save favorite songs list to DB
    function setFavoriteSong(song) {
        return $http.post(urlSetFavoriteSong, song)
    }

    function getFavoriteSongs(username) {
        return $http.get(urlGetFavoriteSongs  + '?username=' +username).then(result => {
            return result.data;
        })
    }
}]);