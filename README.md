# Descripcion:
VGM (Videogame Music) Player - Multiplatform - Spotify's like
Scraping data and music public data from VGM dedicated sites like [www.zophar.net][1] and [khinsider.com][2]

## Setup on MacOS:
    install dependencies:
        npm i
    install mondodb server
        brew tap mongodb/brew
        brew install mongodb-community
        brew services start mongodb/brew/mongodb-community
    run cypress script to first scrap neccesary data
        ./node_modules/cypress/bin/cypress run ./cypress/integration/scrapping-scripts/getconsoles-cy.js

### Features:
1.  Scrapp a site with vgm music and get albums and tracks.
2.  Play each song or album in an HTML5 player ([Howler.js][6])
3.  Uses Chrome's [MediaSession API][5] to control player on smarthphone notifications.
4.  Can randomly play 1 album or 1 song
5.  Find and filter albums/tracks in the whole VGM database
6.  Fire database with scrapped data (scrapping just executed once)

### Optional future features:
1.  Login with 0Auth google/fbk
2.  Keep user profile with starred albums, songs, etc
3.  Create user playlists
4.  User comments on albums

#### Sample songs that rocks:
-   [https://downloads.khinsider.com/game-soundtracks/album/max-payne-pc-rip/02%2520max%2520payne%2520theme.mp3][3]
-   [http://66.90.93.122/soundfiles/sega-saturn-ssf/street-fighter-alpha-warriors-dreams/T-1206G_15.mp3][4]

#### Finally:
Im very oppened to hear opinions and accept any colaboration or help. 

[1]: www.zophar.net
[2]: http://khinsider.com
[3]: https://downloads.khinsider.com/game-soundtracks/album/max-payne-pc-rip/02%2520max%2520payne%2520theme.mp3
[4]: http://66.90.93.122/soundfiles/sega-saturn-ssf/street-fighter-alpha-warriors-dreams/T-1206G_15.mp3
[5]: https://googlechrome.github.io/samples/media-session/audio.html
[6]: https://github.com/goldfire/howler.js/