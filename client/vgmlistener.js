app.controller('MainCtrl', ['VgmListenerFactory', '$scope', '$sce', '$mdSidenav',
  function(VgmListenerFactory, $scope, $sce, $mdSidenav) {

  let currentSong = null;
  let subtitle = document.getElementById('subtitle');
  let list = document.getElementById('list');
  let track = document.getElementById('track');
  $scope.trustSrc = function(src) {
    return $sce.trustAsResourceUrl(src);
  }
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
    $scope.data = {}
    $scope.data.mode = "Menu" // Muestra menu en overlay hamburger menu
  }

  // SideNav
  $scope.toggleSidebar = buildToggler('left');
  function buildToggler(componentId) {
    return function() {
      $mdSidenav(componentId).toggle();
    };
  }

  getScrappedAlbums = function() {
    VgmListenerFactory.getAllAlbums().then( function(result) {
      if(!result.data) return;
      $scope.albums = result.data.result;
      $scope.album = result.data.result[1].album;
    })
  }

  $scope.albumSelected = function(albumItem) {
    // $scope.toggleSidebar();
    player.togglePlaylist();
    $scope.album = albumItem.album;
    songs = albumItem.album.songs.map(function(song){
      return {
        title: song.title,
        src: song.track_href,
        howl: null
      }
    })
    var html = `${albumItem.album.title} <span>(${ albumItem.album.totalTime } - ${ albumItem.album.totalSize })</span>`
    subtitle.innerHTML = html;
    list.innerHTML = '';
    player = new Player(songs);
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
