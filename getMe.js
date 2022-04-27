const token = "BQBWCV-C68BRFrlSxO1kpZbPYLYs-zAUaYMFvKLUv3yihNb68egTgRVFnb4MjzpFsP8kR6DzEGFwmnwBQ-CJjLR_MmNrELuwKSKyVuOjyA7g_wlxd5osvLavZZ75uEeGzAVATJDt8wzo_h2pbcyodmOwftqEEtSAVTv9id-leQ26X03sVp5qy_G7QhNNI-sebmUgcWZwjUHXkIsO9vSNmMtnbNmCOkGDxL6t6nBo_5XR6GvyoEGxiSqFkFIgK10iMQ-8aM4IG_bK5MCyUFf5aBWtKXpZlII-7uEWVcp_M0HsVjNG";
const fs = require('fs')
var dir = './jsons';
const SpotifyWebApi = require('spotify-web-api-node');
const spotifyApi = new SpotifyWebApi();
spotifyApi.setAccessToken(token);

//GET MY PROFILE DATA
function getMyData() {
  (async () => {
    const me = await spotifyApi.getMe();
    console.log(me.body);
    getUserPlaylists(me.body.id);
  })().catch(e => {
    console.error(e);
  });
}

//GET MY PLAYLISTS
async function getUserPlaylists(userName) {
  const data = await spotifyApi.getUserPlaylists(userName)

  console.log("---------------+++++++++++++++++++++++++")
  let playlists = []

  for (let playlist of data.body.items) {
    console.log(playlist.name + " " + playlist.id)
    
    let tracks = await getPlaylistTracks(playlist.id, playlist.name);
    // console.log(tracks);

   //we create a directory to save the json files
    if (!fs.existsSync(dir)){
      fs.mkdirSync(dir);
  }
    //create the json files from the playlists.
    const tracksJSON = { tracks }
    let data = JSON.stringify(tracksJSON);
    fs.writeFileSync('./jsons/' + playlist.name+'.json', data);
  }
}

//GET SONGS FROM PLAYLIST
async function getPlaylistTracks(playlistId, playlistName) {

  const data = await spotifyApi.getPlaylistTracks(playlistId, {
    offset: 1,
    limit: 100,
    fields: 'items'
  })

  // console.log('The playlist contains these tracks', data.body);
  // console.log('The playlist contains these tracks: ', data.body.items[0].track);
  console.log("'" + playlistName + "'" + ' contains these tracks:');
  let tracks = [];

  for (let track_obj of data.body.items) {
    const track = track_obj.track
    tracks.push(track);
    console.log(track.name + " : " + track.artists[0].name)
  }
  
  console.log("---------------+++++++++++++++++++++++++")
  return tracks;
}

getMyData();
