// Cypress installation Mac /Users/macbookair/Library/Caches/Cypress/3.1.4

context('Scrapping album songs', () => {
    var baseUrl = "https://downloads.khinsider.com";
    var apiSaveAlbumUrl = "http://localhost:8080/api/albums"
    var albumUrl = ""; // /game-soundtracks/album/dracula-battle-perfect-selection";
    var album = {}
    // dracula-battle-perfect-selection
    // shenmue-original-soundtrack
    // super-mario-rpg-original-soundtrack

    it('1) Must get src from MP3 audio files', () => {
        albumUrl = Cypress.env('ALBUM_URL')
        let album_name, totalTime, totalSize, album_cover, 
            album_tracks = [], urlSongList = [];
        var songActualUrlList = [];
        var albumArtImgs = [];
        var rowsTotalSongs = 0;

        cy.visit(baseUrl + albumUrl)
        
        .get("#songlist_footer").then( $footer => {
            totalTime = $footer.find("th:nth-child(2) b").text();
            totalSize = $footer.find("th:nth-child(3) b").text();
        })
        .get("#EchoTopic p:contains('Album name:') b:first").then( $el => {
            album_name = $el.text();
        })

        // Executes javascript on 'window' dom object
        cy.window().then((win) => {
            // 1) cancel downloading request of the actual mp3 file
            let audioEl = win.document.getElementById('audio1'); 
            win.document.querySelectorAll(".playTrack").forEach(el => {
                el.addEventListener("click", function(ev){
                    let srcActual = audioEl.getAttribute('src');
                    songActualUrlList.push(srcActual);
                    audioEl.setAttribute('src', '');
                    ev.preventDefault();
                    return false;
                });
            }) 
            // 2) Get the album_cover if is present
            album_cover = win.document.querySelectorAll("#EchoTopic a[target='_blank'] img")[0]
            if (album_cover) {
                album_cover = album_cover.getAttribute('src');
                albumArtImgs.push(album_cover);
            }
        })

        // Scrapps album tracks real url of the .MP3 by clicking the #tr
        .get('.playTrack').then( $playTrackBtn => {
            $playTrackBtn.click();
        })
        .get("#songlist tbody tr:not(#songlist_header,#songlist_footer)").each(($tr, index) => {
            cy.wrap($tr).find("td").then(td => {
                if (!td) return;
                var cd = td.parent().find("td[align='center']").not("[title]").text();
                var track_nro = td.parent().find("td[align='right']").not(".clickable-row").text();
                var title = td.parent().find(".clickable-row a").eq(0).text();
                var track_duration = td.parent().find(".clickable-row a").eq(1).text();
                var track_filesize = td.parent().find(".clickable-row a").eq(2).text();
                album_tracks.push({
                    cd: cd,
                    title: title,
                    track_nro: track_nro,
                    track_duration: track_duration,
                    track_filesize: track_filesize,
                    // Actual song href direct .mp3 link
                    track_href: songActualUrlList[index]
                })
            })
        }).then(()=> {
            return {
                url: albumUrl.split('/').pop(),
                title: album_name,
                totalTime: totalTime,
                totalSize: totalSize,
                coverImgs: albumArtImgs,
                songs: album_tracks
            }
        }).then( fullAlbum => {                
            if (!fullAlbum) return;
            console.log('fullAlbum', JSON.stringify(fullAlbum))
            album = fullAlbum;
        })
    })
    it('2) Save album and songs to API', () => {
        if (!album.songs) return;
        cy  .request('POST', apiSaveAlbumUrl, { album })
            .then((response) => {
                expect(response.status).to.eq(200)
            })
    })
})