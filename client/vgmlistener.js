app.controller('MainCtrl', ['VgmListenerFactory', 'UtilFactory', 'FavoritesFactory', '$scope',
  function (VgmListenerFactory, UtilFactory, FavoritesFactory, $scope, ) {

    let subtitle = document.getElementById('subtitle');
    let list = document.getElementById('list');
    $scope.data = {}
    $scope.data.mode = "Menu" // Muestra menu en overlay hamburger menu

    // currentUser object including All Favorite songs
    let currentUser = {
      username: 'ArayaMario',
      email: '',
      favorites: []
    }
    window["starredBtn"] = document.getElementById("starredBtn");

    onInit = function () {
      UtilFactory.getConsoles($scope);
      UtilFactory.getScrappedAlbums($scope);
      // UtilFactory.getUserdata(currentUser);
      FavoritesFactory.getFavoriteSongs(currentUser, $scope);
    }

    // Album is selected and playlist is created
    $scope.albumSelected = function (album) {
      UtilFactory.toggleMainMenu();
      if (album.title === 'My Favorite Songs !!!') {
        loadSongsObject({ album: album });
      } else {
        // Get album and songs Service
        let albumUrl = album.url.substring(album.url.lastIndexOf('/') + 1);
        VgmListenerFactory.getAlbum(albumUrl).then(function (result) {
          if (!result && !result.data.result[0]) return;
          loadSongsObject(result.data.result[0]);
        })
      }

    }

    loadSongsObject = function (albumData) {
      $scope.album = albumData.album;
      $scope.album.id = albumData._id;

      var htmlSubtitle = `${$scope.album.title} <span>(${$scope.album.totalTime} 
                        - ${ $scope.album.totalSize})</span>`;
      subtitle.innerHTML = htmlSubtitle;
      document.title = $scope.album.title;
      list.innerHTML = '';
      $scope.songs = $scope.album.songs.map(function (song) {
        return {
          // id: song.id,
          title: song.song_name || song.title || song.track,
          src: song.song_url || song.track_href,
          howl: null
        }
      })
      player = new Player($scope.songs);
      player.togglePlaylist();
    }

    $scope.consoleSelected = function (consoleItem) {
      VgmListenerFactory.getAlbumsByConsole(consoleItem.name).then(
        result => {

          if (result) {
            $scope.data.mode = 'ConsoleAlbums';
            $scope.consoleAlbums = consoleItem.albums.map(function (album) {
              return {
                name: album.name,
                url: album.url,
                howl: null
              }
            })
            // list.innerHTML = '';
            subtitle.innerHTML = consoleItem.name;
          }
        }
      )

      // var html = `${consoleItem.name} <span>(${ consoleItem. })</span>`
      // TODO: aca limpiar el player para que no quede cacheado y sonando
    }

    document.onkeydown = function (evt) {
      evt = evt || window.event;
      if (evt.keyCode == 27)
        player.togglePlaylist();
    };

    $scope.showFavorites = function () {
      FavoritesFactory.getFavoriteSongs(currentUser, $scope);
    }
    $scope.toggleFavorite = function (track_index) {
      if (track_index === undefined) track_index = player.index;

      let currentSong = player.playlist[track_index];
      if (!currentSong || !currentSong.src) return;

      FavoritesFactory.toggleStarIcon(track_index, currentSong)
      FavoritesFactory.toggleFavoriteSong(currentUser, currentSong, $scope.album);
    }

    onInit();
  }]);
