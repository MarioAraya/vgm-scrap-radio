var app = angular.module('VgmListener', [])

app.factory('VgmListenerFactory', ['$http', function($http) {
    let urlGetConsoles = '/api/consoles';
    let urlGetAlbums = '/api/albums'; 
    let urlGetAlbum = '/api/album'; 
    let urlSetFavoriteSongs = '/api/toggle-favorite-song'
    let urlGetFavoriteSongs = '/api/get-favorite-songs'
    let urlGetAlbumsByConsole = '/api/get-console-albums'
    let urlGetUserData = '/api/get-userdata'
    
    return {
        getConsoles: getConsoles,
        getAlbumsByConsole: getAlbumsByConsole,
        getAllAlbums: getAllAlbums,
        getAlbum: getAlbum,
        setFavoriteSongs: setFavoriteSongs,
        getFavoriteSongs: getFavoriteSongs,
        getUserData: getUserData
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
    function setFavoriteSongs(favorites) {
        return $http.post(urlSetFavoriteSongs, favorites)
    }

    function getFavoriteSongs(username) {
        return $http.get(urlGetFavoriteSongs  + '?username=' +username).then(result => {
            return result.data.result[0];
        })
    }

    function getUserData(username) {
        return $http.get(urlGetUserData + '?username=' +username).then(result => {
            return result.data.result[0];
        })
    }
}]);