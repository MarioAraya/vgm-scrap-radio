app.controller('MainCtrl', ['VgmListenerFactory', '$scope',
  function(VgmListenerFactory, $scope,) {

  let currentSong = null;
  let subtitle = document.getElementById('subtitle');
  let list = document.getElementById('list');
  let track = document.getElementById('track');
  $scope.data = {}
  $scope.user = {
    id: 1,
    name: 'arayamario',
    email: 'someemail@gmail.com',
    
    // List of favorite songs !!
    favorites:  [{
      album: 'Shenmue Original Soundtrack', 
      starred: [
        {title: "A New Journey", src: "http://66.90.93.122/ost/shenmue-original-soundtrack/jsvnfiqv/A%20New%20Journey.mp3"},
        {title: "Cherry Blossom Wind Dance", src: "http://66.90.93.122/ost/shenmue-original-soundtrack/ypvqrcrq/Cherry%20Blossom%20Wind%20Dance.mp3"}
      ]},
      {
        album: 'Dracula Battle Perfect Selection', 
        starred: [
          {title: "beginning", src: "http://66.90.93.122/ost/dracula-battle-perfect-selection/wkyqtvze/01%20-%20beginning.mp3"},
          {title: "vampire killer", src: "http://66.90.93.122/ost/dracula-battle-perfect-selection/gaccfgaz/07%20-%20vampire%20killer.mp3", howl: null}
        ]}
    ]
  }
  $scope.data.mode = "Menu" // Muestra menu en overlay hamburger menu
  window["starredBtn"] = document.getElementById("starredBtn");

  $scope.playSong = function(track) {
    if (currentSong) {
      currentSong.stop()
      currentSong.unload()
      currentSong = null;
    }
    currentSong = new Howl({
      src: [track.track_href],
      autoplay: true
    });
    currentSong.play();
  };

  // Carga console list
  this.$onInit = function() {
    VgmListenerFactory.getConsoles().then(function(res) {
      $scope.consoles = res.data.result;
    })
    getScrappedAlbums();
    list.innerHTML = '';
    track.onclick = function(ev) {
      player.togglePlaylist();
    }
    subtitle.onclick = function(ev) {
      player.togglePlaylist();
    }
  }


  getScrappedAlbums = function() {
    VgmListenerFactory.getAllAlbums().then( function(result) {
      if(!result.data) return;
      $scope.albums = result.data.result;
      $scope.album = result.data.result[1].album;
    })
  }

  loadUserFavoriteTracks = function(albumTitle){
    if (albumTitle === $scope.album.title) {
      let userFavs = $scope.user.favorites.filter(e => e.album === albumTitle)[0].starred;
      userFavs.forEach(fav => {
        debugger
        fav
      })
    }
  }

  $scope.albumSelected = function(album) {
    toggleMainMenu();
    albumUrl = album.url.substring(album.url.lastIndexOf('/') + 1);
    // Get album and songs Service
    VgmListenerFactory.getAlbum(albumUrl).then(function(result){
      if (!result && !result.data.result[0]) return;
      $scope.album = result.data.result[0].album;
      
      var htmlSubtitle = `${$scope.album.title} <span>(${ $scope.album.totalTime } 
                          - ${ $scope.album.totalSize })</span>`;
      subtitle.innerHTML = htmlSubtitle;
      document.title = $scope.album.title;
      list.innerHTML = '';
      songs = $scope.album.songs.map(function(song){
        return {
          title: song.title,
          src: song.track_href,
          howl: null
        }
      })
      
      // TODO: aca limpiar el player para que no quede cacheado y sonando
      player = new Player(songs);
      player.togglePlaylist();
      loadUserFavoriteTracks($scope.album.title);
    })
  }

  $scope.consoleSelected = function(consoleItem) {
    VgmListenerFactory.getAlbumsByConsole(consoleItem.name).then(
      result => {

        if (result) {
          $scope.data.mode = 'ConsoleAlbums';
          $scope.consoleAlbums = consoleItem.albums.map(function(album){
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

  document.onkeydown = function(evt) {
    evt = evt || window.event;
    if (evt.keyCode == 27) 
      player.togglePlaylist();
  };


  // TODO: add users login to implement FAVORITES/STARRED songs

  $scope.saveSongToFavorites = function(song, album) {
    debugger
    let _addFavoriteSong = {
      song: song,
      album: album,
      uid: '1' // User id
    }
    VgmListenerFactory.saveSongToFavorites(_addFavoriteSong).then( function(result) {
      if(!result) return;
      // Song added to favorites
    })
  }

  $scope.toggleFavorite = function(track_index){
    let currentSong = player.playlist[track_index];
    if (!currentSong.src) return;
    
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

    // VgmListenerFactory.saveSongToFavorites(_addFavoriteSong).then( function(result) {
    //   if(!result) return;
    //   // Song added to favorites
    // })
  }

  toggleMainMenu = function() {
    document.querySelectorAll(".checkbox-toggle")[0].click();
  }


  // $scope.getFavoritesSongs = function() {
  //   VgmListenerFactory.getFavoritesSongs().then( function(result) {
  //     if(!result) return;
  //     // Loaded list of favorite songs !!
  //   })
  // }

  // Sample songs :
  // $scope.songsSample = [
  //   'http://66.90.93.122/ost/super-mario-world-original-soundtrack/kssyzysfyy/28%20-%20Ending.mp3',
  //   'http://66.90.93.122/ost/rockman-forte-original-soundtrack-version-01/keitqwst/09%20Cold%20Man.mp3',
  //   'http://66.90.93.122/ost/rockman-forte-original-soundtrack-version-01/yaerljpx/03%20Introduction%20Stage.mp3',
  //   'http://66.90.93.122/ost/vortex-snes/fclwkmlo/08_Voltair.mp3',
  //   'http://66.90.93.122/ost/ace-combat-4-shattered-skies-original-soundtracks/yzyktcfy/216%20blue%20skies.mp3'
  // ]

}]);
