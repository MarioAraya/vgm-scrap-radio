
app.factory('UtilFactory', ['VgmListenerFactory', function(VgmListenerFactory) {
    return {
      setInitialUI: setInitialUI,
      getUserdata: getUserdata,
      getConsoles: getConsoles,
      getScrappedAlbums: getScrappedAlbums,
      getFavoriteSongs: getFavoriteSongs,
      toggleFavoriteSong: toggleFavoriteSong,
      toggleStarIcon: toggleStarIcon,
      toggleMainMenu: toggleMainMenu
    }
    
    function setInitialUI() {
      list.innerHTML = '';
      track.onclick = function(ev) {
        player.togglePlaylist();
      }
      subtitle.onclick = function(ev) {
        player.togglePlaylist();
      }
    }

    function getUserdata(currentUser) {
      VgmListenerFactory.getUserData(currentUser.username).then(result => {
        if (result) {
          currentUser = {
            username: result.username,
            email: result.email
          }
        }        
        else {
          console.error('User cannot be found on DB')
          // TODO: create new user flow ...
        }
      })
      .catch(err => console.log('getUserdata error: ', err))
    }

    function getConsoles($scope) {
      VgmListenerFactory.getConsoles().then(function(res) {
        $scope.consoles = res.data.result;
      })
      .catch(err => console.log('getConsoles error: ', err))
    }

    function getScrappedAlbums($scope) {
      VgmListenerFactory.getAllAlbums().then( function(result) {
        if(!result.data) return;
        $scope.albums = result.data.result;
        $scope.album = result.data.result[1].album;
      })
      .catch(err => console.log('getScrappedAlbums error: ', err))
    }

    /**
     * Todo: - validate when "favorite songs" menu is selected twice,
     *         must allow play songs from different albums stopping previous song playing
     *       - save songs Favorites with albumName or get it from DB in a query
     */
    function getFavoriteSongs(currentUser, $scope){
      VgmListenerFactory.getFavoriteSongs(currentUser.username).then( result => {
        if (!result) return;
        let favoritesAsAlbum = convertToAlbum(result);
        $scope.albumSelected(favoritesAsAlbum)
        toggleMainMenu();
      })
    }

    function toggleFavoriteSong(currentUser, currentSong, album_id) {
      let song = {
        album_id: album_id, 
        song_name: currentSong.title, 
        song_url: currentSong.src
      }
      let songIsSaved = currentUser.favorites.find(fav => {
        if (fav.url === currentSong.src) return true;
      })
      if (!songIsSaved)
        currentUser.favorites.push(song);
      else
        currentUser.favorites.pop(song);


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

    function toggleMainMenu() {
      document.querySelectorAll(".checkbox-toggle")[0].click();
    }
    
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
  }
]);


