
app.factory('UtilFactory', ['VgmListenerFactory', function(VgmListenerFactory) {
    return {
      setInitialUI: setInitialUI,
      getUserdata: getUserdata,
      getConsoles: getConsoles,
      getScrappedAlbums: getScrappedAlbums,
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

    function toggleMainMenu() {
      document.querySelectorAll(".checkbox-toggle")[0].click();
    }
  }
]);


