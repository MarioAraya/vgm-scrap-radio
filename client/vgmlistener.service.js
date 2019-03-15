var app = angular.module('VgmListener', [])

app.factory('VgmListenerFactory', ['$http', function($http) {
    let urlGetConsoles = '/api/consoles';
    let urlGetAlbums = '/api/albums'; 
    let urlGetAlbum = '/api/album'; 
    let urlAddFavorites = '/api/add-starred'
    let urlGetFavoriteSongs = '/api/get-starred-songs'
    let urlGetAlbumsByConsole = '/api/get-console-albums'
    
    return {
        getConsoles: getConsoles,
        getAlbumsByConsole: getAlbumsByConsole,
        getAllAlbums: getAllAlbums,
        getAlbum: getAlbum,
        saveSongToFavorites: saveSongToFavorites,
        getFavoritesSongs: getFavoritesSongs
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

    // song object: { song, album, uid }
    function saveSongToFavorites(song) {
        song.song.album = song.album.title;
        return $http.post(urlAddFavorites, song)
    }

    function getFavoritesSongs() {
        return $http.get(urlGetFavoriteSongs)
    }
}]);