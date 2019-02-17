// Cypress installation Mac /Users/macbookair/Library/Caches/Cypress/3.1.4

context('Scrapping album songs', () => {
    var baseUrl = "https://downloads.khinsider.com";
    var apiSaveAlbumUrl = "http://localhost:8080/api/albums"
    var albumUrl = "/game-soundtracks/album/shenmue-original-soundtrack";
    var album = {}
    // dracula-battle-perfect-selection
    // shenmue-original-soundtrack
    // super-mario-rpg-original-soundtrack
    
    it('1) Must get src from MP3 audio files', () => {
        let album_name, totalTime, totalSize, album_cover, 
            album_tracks = [], urlSongList = [];
        var songActualUrlList = [];
        var rowsTotalSongs = 0;

        cy.visit(baseUrl + albumUrl)
        
        .get("#songlist_footer").then( $footer => {
            totalTime = $footer.find("th:nth-child(2) b").text();
            totalSize = $footer.find("th:nth-child(3) b").text();
        })
        .get("#EchoTopic p:contains('Album name:') b:first").then( $el => {
            album_name = $el.text();
        })
        // .get("#EchoTopic a[target='_blank']").each( (i, el) => {
        //     cy.wrap($el).should('have.attr', 'href').then( imgSrc => { 
        //         console.log(imgSrc)
        //         album_cover = imgSrc;
        //     })
        // })

        // Scrapps album tracks real url of the .MP3 by clicking the #tr
        .get('.audioplayerPlayPause').then( $btnPlayMain => {
            cy.get("#songlist tbody tr:not(#songlist_header,#songlist_footer)").then( $songRow => {
                rowsTotalSongs = $songRow.length; 
                $btnPlayMain.click()
                for(var i=0; i<rowsTotalSongs; i++){
                    cy.get('audio')
                        .should('have.attr', 'src')
                        .then((src) => {
                            songActualUrlList.push(src);
                        })
                        .get('#btnNext').then( $btnNext => {
                            $btnNext.click()
                        })
                }
            })
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
                coverImg: album_cover,
                songs: album_tracks
            }
        }).then( fullAlbum => {                
            if (!fullAlbum) return;
            console.log('fullAlbum', JSON.stringify(fullAlbum))
            album = fullAlbum;
        })
    })
    it('2) Save album and songs to API', () => {
        cy  .request('POST', apiSaveAlbumUrl, { album })
            .then((response) => {
                debugger
                expect(response.status).to.eq(200)
            })
    })
})