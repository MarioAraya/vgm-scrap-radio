app.factory('FavoritesFactory', ['VgmListenerFactory', function (VgmListenerFactory) {
    return {
        getFavoriteSongs,
        toggleFavoriteSong,
        toggleStarIcon
    }

    /**
     * Todo: - validate when "favorite songs" menu is selected twice,
     *         must allow play songs from different albums stopping previous song playing
     *       - save songs Favorites with albumName or get it from DB in a query
     */
    function getFavoriteSongs(currentUser, $scope) {
        VgmListenerFactory.getFavoriteSongs(currentUser.username)
            .then(favorites => {
                debugger
                if (!favorites) return;
                let favoritesAsAlbum = convertToAlbum(favorites);
                currentUser.favorites = favorites.favorites;
                $scope.albumSelected(favoritesAsAlbum)
                toggleMainMenu();
            }).catch(err => {
                console.error('Error al guardar favoritos', err);
            })
    }

    function toggleFavoriteSong(currentUser, song, album) {
        let songObj = {
            album_id: album.id,
            album_name: album.title,
            song_name: song.title,
            song_url: song.src
        }
        let songIsSaved = currentUser.favorites.find(fav => {
            if (fav.url === song.src) return true;
        })
        if (!songIsSaved)
            currentUser.favorites.push(songObj);
        else
            currentUser.favorites.pop(songObj);

        VgmListenerFactory.setFavoriteSongs(currentUser.favorites)
            .then(result => {
                if (!result) return;
                currentUser.favorites = result.favorites;
                console.log('Favorite songs saved to BD')
            })
    }

    function toggleStarIcon(track_index, currentSong) {
        playlistIndex = parseInt(track_index, 10) + 1;
        playlist.querySelector(` .list-song:nth-child(${playlistIndex}) .fa`).classList.toggle("fa-star-o")
        playlist.querySelector(` .list-song:nth-child(${playlistIndex}) .fa`).classList.toggle("fa-star")
        playlist.querySelector(` .list-song:nth-child(${playlistIndex}) .fa`).classList.toggle("starred")

        if (currentSong.howl && currentSong.howl.playing()) {
            let starredBtnIconClass = starredBtn.children[0].classList;
            if (starredBtnIconClass.contains("fa-star-o")) {
                starredBtnIconClass.add("fa-star", "starred")
                starredBtnIconClass.remove("fa-star-o")
            } else {
                starredBtnIconClass.add("fa-star-o")
                starredBtnIconClass.remove("starred")
            }
        }
    }

    // Métodos Privados:
    function convertToAlbum(favorites) {
        if (favorites) {
            return {
                songs: favorites.favorites,
                title: "My Favorite Songs !!!",
                totalSize: "",
                totalTime: "",
                url: ""
            }
        }
    }
}]);