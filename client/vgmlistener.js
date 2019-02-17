app.controller('MainCtrl', ['VgmListenerFactory', '$scope', '$sce', '$mdSidenav',
  function(VgmListenerFactory, $scope, $sce, $mdSidenav) {
    
  let dummyAlbum = {"result":[{"_id":"5c520e10187b1bb43a70bf99","album":{"url":"shenmue-original-soundtrack","title":"Shenmue Original Soundtrack","totalTime":"1h 59m","totalSize":"192 MB","songs":[{"cd":"","title":"A New Journey","track_nro":"","track_duration":"6:25","track_filesize":"10.30 MB","track_href":"http://66.90.93.122/ost/shenmue-original-soundtrack/jsvnfiqv/A%20New%20Journey.mp3"},{"cd":"","title":"Antiquity Tree","track_nro":"","track_duration":"1:29","track_filesize":"2.39 MB","track_href":"http://66.90.93.122/ost/shenmue-original-soundtrack/skpwswkl/Antiquity%20Tree.mp3"},{"cd":"","title":"Cherry Blossom Wind Dance","track_nro":"","track_duration":"1:39","track_filesize":"2.66 MB","track_href":"http://66.90.93.122/ost/shenmue-original-soundtrack/ypvqrcrq/Cherry%20Blossom%20Wind%20Dance.mp3"},{"cd":"","title":"Christmas on Dobuita St.","track_nro":"","track_duration":"2:14","track_filesize":"3.59 MB","track_href":"http://66.90.93.122/ost/shenmue-original-soundtrack/ouxluovt/Christmas%20on%20Dobuita%20St..mp3"},{"cd":"","title":"Dawn","track_nro":"","track_duration":"2:32","track_filesize":"4.08 MB","track_href":"http://66.90.93.122/ost/shenmue-original-soundtrack/xglhvfda/Dawn.mp3"},{"cd":"","title":"Departure","track_nro":"","track_duration":"2:17","track_filesize":"3.67 MB","track_href":"http://66.90.93.122/ost/shenmue-original-soundtrack/cctluavc/Departure.mp3"},{"cd":"","title":"Earth & Sea (OST Ver.)","track_nro":"","track_duration":"2:40","track_filesize":"4.29 MB","track_href":"http://66.90.93.122/ost/shenmue-original-soundtrack/isnrhzgj/Earth%20%26%20Sea%20%28OST%20Ver.%29.mp3"},{"cd":"","title":"Encounter with Destiny","track_nro":"","track_duration":"3:28","track_filesize":"5.57 MB","track_href":"http://66.90.93.122/ost/shenmue-original-soundtrack/wqamncnu/Encounter%20with%20Destiny.mp3"},{"cd":"","title":"Flag of Lions","track_nro":"","track_duration":"3:01","track_filesize":"4.85 MB","track_href":"http://66.90.93.122/ost/shenmue-original-soundtrack/roitwrre/Flag%20of%20Lions.mp3"},{"cd":"","title":"Flower Girl","track_nro":"","track_duration":"1:38","track_filesize":"2.64 MB","track_href":"http://66.90.93.122/ost/shenmue-original-soundtrack/yvcgnlya/Flower%20Girl.mp3"},{"cd":"","title":"Hip De Hop","track_nro":"","track_duration":"3:33","track_filesize":"5.71 MB","track_href":"http://66.90.93.122/ost/shenmue-original-soundtrack/ntczklyh/Hip%20De%20Hop.mp3"},{"cd":"","title":"Memories of Distant Days","track_nro":"","track_duration":"3:49","track_filesize":"6.13 MB","track_href":"http://66.90.93.122/ost/shenmue-original-soundtrack/xtnhlxzv/Memories%20of%20Distant%20Days.mp3"},{"cd":"","title":"Memories of Distant Days (Iwao) Ver. 2","track_nro":"","track_duration":"2:25","track_filesize":"3.87 MB","track_href":"http://66.90.93.122/ost/shenmue-original-soundtrack/iwflgnmz/Memories%20of%20Distant%20Days%20%28Iwao%29%20Ver.%202.mp3"},{"cd":"","title":"New Departure","track_nro":"","track_duration":"6:18","track_filesize":"10.12 MB","track_href":"http://66.90.93.122/ost/shenmue-original-soundtrack/xwsfdjjq/New%20Departure.mp3"},{"cd":"","title":"New Departure (Arranged Ver.)","track_nro":"","track_duration":"6:19","track_filesize":"10.14 MB","track_href":"http://66.90.93.122/ost/shenmue-original-soundtrack/zgvdscat/New%20Departure%20%28Arranged%20Ver.%29.mp3"},{"cd":"","title":"Nightmare","track_nro":"","track_duration":"2:02","track_filesize":"3.26 MB","track_href":"http://66.90.93.122/ost/shenmue-original-soundtrack/itxidemo/Nightmare.mp3"},{"cd":"","title":"Nozomi (OST Ver.)","track_nro":"","track_duration":"3:16","track_filesize":"5.24 MB","track_href":"http://66.90.93.122/ost/shenmue-original-soundtrack/kdcdpwuf/Nozomi%20%28OST%20Ver.%29.mp3"},{"cd":"","title":"Nozomi and Ryo","track_nro":"","track_duration":"3:56","track_filesize":"6.31 MB","track_href":"http://66.90.93.122/ost/shenmue-original-soundtrack/drunrjbz/Nozomi%20and%20Ryo.mp3"},{"cd":"","title":"Revenge of a Sailor","track_nro":"","track_duration":"1:16","track_filesize":"2.05 MB","track_href":"http://66.90.93.122/ost/shenmue-original-soundtrack/bfwcxawl/Revenge%20of%20a%20Sailor.mp3"},{"cd":"","title":"Sadness and Hope","track_nro":"","track_duration":"2:59","track_filesize":"4.80 MB","track_href":"http://66.90.93.122/ost/shenmue-original-soundtrack/xmbdnjjx/Sadness%20and%20Hope.mp3"},{"cd":"","title":"Secret of a Warehouse","track_nro":"","track_duration":"2:21","track_filesize":"3.76 MB","track_href":"http://66.90.93.122/ost/shenmue-original-soundtrack/kucktsgy/Secret%20of%20a%20Warehouse.mp3"},{"cd":"","title":"Separated from Yokosuka","track_nro":"","track_duration":"2:25","track_filesize":"3.89 MB","track_href":"http://66.90.93.122/ost/shenmue-original-soundtrack/ugwowjgz/Separated%20from%20Yokosuka.mp3"},{"cd":"","title":"Shenhua","track_nro":"","track_duration":"3:00","track_filesize":"4.83 MB","track_href":"http://66.90.93.122/ost/shenmue-original-soundtrack/fracqssp/Shenhua.mp3"},{"cd":"","title":"Shenhua - Song of the Bay (Vocal Ver.)","track_nro":"","track_duration":"3:50","track_filesize":"6.16 MB","track_href":"http://66.90.93.122/ost/shenmue-original-soundtrack/ltiivoft/Shenhua%20-%20Song%20of%20the%20Bay%20%28Vocal%20Ver.%29.mp3"},{"cd":"","title":"Shenmue (Arranged Ver.)","track_nro":"","track_duration":"8:07","track_filesize":"13.01 MB","track_href":"http://66.90.93.122/ost/shenmue-original-soundtrack/zdzewzfm/Shenmue%20%28Arranged%20Ver.%29.mp3"},{"cd":"","title":"Shenmue (Original Ver.)","track_nro":"","track_duration":"3:58","track_filesize":"6.35 MB","track_href":"http://66.90.93.122/ost/shenmue-original-soundtrack/rxctraji/Shenmue%20%28Original%20Ver.%29.mp3"},{"cd":"","title":"Snack Linda Theme","track_nro":"","track_duration":"2:03","track_filesize":"3.29 MB","track_href":"http://66.90.93.122/ost/shenmue-original-soundtrack/hgseftml/Snack%20Linda%20Theme.mp3"},{"cd":"","title":"Tears of Separation","track_nro":"","track_duration":"2:06","track_filesize":"3.38 MB","track_href":"http://66.90.93.122/ost/shenmue-original-soundtrack/vstugthy/Tears%20of%20Separation.mp3"},{"cd":"","title":"The Initiator","track_nro":"","track_duration":"5:57","track_filesize":"9.52 MB","track_href":"http://66.90.93.122/ost/shenmue-original-soundtrack/jxsxozue/The%20Initiator.mp3"},{"cd":"","title":"The Place Where the Sun Sets","track_nro":"","track_duration":"3:04","track_filesize":"4.92 MB","track_href":"http://66.90.93.122/ost/shenmue-original-soundtrack/docdthpb/The%20Place%20Where%20the%20Sun%20Sets.mp3"},{"cd":"","title":"The Place Where the Sun Sets Ver. 2","track_nro":"","track_duration":"4:09","track_filesize":"6.65 MB","track_href":"http://66.90.93.122/ost/shenmue-original-soundtrack/qxqmittf/The%20Place%20Where%20the%20Sun%20Sets%20Ver.%202.mp3"},{"cd":"","title":"To Fly Vacantly, Like an Eagle","track_nro":"","track_duration":"3:32","track_filesize":"5.67 MB","track_href":"http://66.90.93.122/ost/shenmue-original-soundtrack/tzghxxnm/To%20Fly%20Vacantly%2C%20Like%20an%20Eagle.mp3"},{"cd":"","title":"Wish...","track_nro":"","track_duration":"4:59","track_filesize":"7.98 MB","track_href":"http://66.90.93.122/ost/shenmue-original-soundtrack/omtehepi/Wish....mp3"},{"cd":"","title":"Wish... (Karaoke Ver.)","track_nro":"","track_duration":"4:58","track_filesize":"7.96 MB","track_href":"http://66.90.93.122/ost/shenmue-original-soundtrack/jxeyhfpa/Wish...%20%28Karaoke%20Ver.%29.mp3"},{"cd":"","title":"Working Man","track_nro":"","track_duration":"1:53","track_filesize":"3.04 MB","track_href":"http://66.90.93.122/ost/shenmue-original-soundtrack/xpqjejfl/Working%20Man.mp3"}]}}]}
  $scope.album = dummyAlbum.result[0].album;
  $scope.trustSrc = function(src) {
    return $sce.trustAsResourceUrl(src);
  }
  $scope.playSong = function(track) {
    // console.log('track', track)
    var player = document.getElementsByClassName('player')[0];
    if (player && track) {
      $scope.currentSong = track.title;
      player.src = this.trustSrc( track.track_href );
      player.play();
    }
  };

  // Carga console list
  this.$onInit = function() {
    VgmListenerFactory.getConsoles().then(function(res) {
      $scope.consoles = res.data.result;
    })
  }

  // SideNav
  $scope.toggleSidebar = buildToggler('left');
  function buildToggler(componentId) {
    return function() {
      $mdSidenav(componentId).toggle();
    };
  }

  // Partials ng-show
  $scope.data = {};
  $scope.payBill = [
    { bill: "Tution", paid:true },
    { bill: "Electricity", paid: false },
    { bill: "Internet", paid: false},
    { bill: "Income Tax", paid: false },
    { bill: "Subway Pass", paid: true },
    { bill: "Library", paid: false }];
  $scope.favorites = [
    { name: 'Akumajo Dracula Best Selection', url: 'http://www.google.com' },
    { name: 'Super Mario World', url: 'http://www.google.com' },
    { name: 'Parasite Eve', url: 'http://www.google.com' },
    { name: 'Yoshis Island, Super Mario World 2', url: 'http://www.google.com' },
  ]

  // Samples: 
  // $scope.songsSample = [
  //   'http://66.90.93.122/ost/super-mario-world-original-soundtrack/kssyzysfyy/28%20-%20Ending.mp3',
  //   'http://66.90.93.122/ost/rockman-forte-original-soundtrack-version-01/keitqwst/09%20Cold%20Man.mp3',
  //   'http://66.90.93.122/ost/rockman-forte-original-soundtrack-version-01/yaerljpx/03%20Introduction%20Stage.mp3',
  //   'http://66.90.93.122/ost/vortex-snes/fclwkmlo/08_Voltair.mp3'  
  // ]
  
}]);
