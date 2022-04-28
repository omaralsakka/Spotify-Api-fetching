var	client_id = '8edabb1f4f7e4c60bfb0730950ddc7d7',
	client_secret = 'ad9281dc77754a50a4c9cc6c7e93e854',
	redirect_uri = encodeURI('http://localhost:8080/Spotify/callback.html'),
	scopes = "user-read-private user-read-email user-modify-playback-state " +
	"user-read-playback-position user-library-read streaming " +
	"user-read-playback-state user-read-recently-played playlist-read-private";

$('#login_btn').click(function() {
	let	logInUri = 'https://accounts.spotify.com/authorize' +
		'?client_id=' + client_id +
		'&response_type=code' +
		'&redirect_uri=' + redirect_uri +
		'&scope=' + scopes +
		'&show_dialog=true';
	window.open(logInUri, '_self',)
})
