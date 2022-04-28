const token = "BQCAedfeFu3UMEbbiDhm64MTFkyzGqJx3PCKjdXAFrHQrZE7hac507aYkW_Zpy-9_goVEFgmRRMXGM4lINlydAzDmlv7bV4xInp0YLNojmDg0pFv7g59OecC8UfaIX_2_TZVF2M3mnfOQEtz8HGEewCCnyE2S7jfkdMk19PCJW-HcPPV1TMAu_3ZTivK8K4Y0YcZFhpkHuHst-z9p25Pgw3kP56O_FF-DimhJtbSYTi5WKzZlf41WCv2a695Bwt6wB3sf75NtYC2Gn3IIIbSFpG85CDOq_OLJYulJVAgGyXosTSj";
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
