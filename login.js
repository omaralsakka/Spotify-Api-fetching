var	client_id = 'XXXXXX', // enter your client id here 
	client_secret = 'XXXXXX', //enter your client secret id here
	redirect_uri = encodeURI('XXXXXX'), //enter your redirect url here
	scopes = "user-read-private user-read-email user-modify-playback-state " +
	"user-read-playback-position user-library-read streaming " +
	"user-read-playback-state user-read-recently-played playlist-read-private"; //user scopes

// on clicking to authorize the login, we build the required url
$('#login_btn').click(function() {
	let	logInUri = 'https://accounts.spotify.com/authorize' +
		'?client_id=' + client_id +
		'&response_type=code' +
		'&redirect_uri=' + redirect_uri +
		'&scope=' + scopes +
		'&show_dialog=true';
	window.open(logInUri, '_self',)
})
