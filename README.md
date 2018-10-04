# Descripcion:
La idea es hacer un "escuchador de musica vgm" usando las bases de datos de sitios publicos 
mediante scrapping para llenar una API JSON. El front sera un reproductor html5/python/reactnative.

# Description:
The goal is make an "video game music mobile listener", using scrapped public data from VGM dedicated 
sites like [www.zophar.net][1] and [khinsider.com][2] to get every mp3 and album data and store it in an Firebase db.

The front-ent listener (the actual app) will be a python or a simple html5 <audio> playlist or a react-native app.

### Features:
1.  Scrapp a site with vgm music and get albums and tracks.
2.  Play each song or album in an HTML5 player
3.  Can randomly play 1 album or 1 song
4.  Find and filter albums/tracks in the whole VGM database
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