<script>
	var	client_id = '8edabb1f4f7e4c60bfb0730950ddc7d7',
	client_secret = 'ad9281dc77754a50a4c9cc6c7e93e854',
	redirect_uri = encodeURI('http://localhost:8080/Spotify/callback.php'),
	scopes = 'user-read-private user-read-email user-library-read';

	const TOKEN = "https://accounts.spotify.com/api/token";

	function handleRedirect() {
		let code = getCode();
		fetchAccountToken(code);
	}

	function fetchAccountToken(code) {
		let body = "grant_type=authorization_code";
		body += "&code=" + code;
		body += "&redirect_uri=" + redirect_uri;
		body += "&client_id=" + client_id;
		body += "&client_secret=" + client_secret;
	/* 	alert(body); */
		callAuthorizationApi(body);
	}

	function callAuthorizationApi(body) {
		let xhr = new XMLHttpRequest();
		xhr.open("POST", TOKEN, true);
		xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		xhr.setRequestHeader('Authorization', 'Basic ' + btoa(client_id + ":" + client_secret));
		xhr.send(body);
		xhr.onload = handleAuthorizationResponse;
	}

	function handleAuthorizationResponse() {
	/* 	alert(this.status + ' : ' + this.responseText); */
		if ( this.status == 200 ){
			var data = JSON.parse(this.responseText);
			// console.log(data);
			var data = JSON.parse(this.responseText);
			if ( data.access_token != undefined ){
				access_token = data.access_token;
				localStorage.setItem("access_token", access_token);
			}
			if ( data.refresh_token  != undefined ){
				refresh_token = data.refresh_token;
				localStorage.setItem("refresh_token", refresh_token);
			}
			if (access_token) {
				location.href = 'getMe.php?access_token=' + access_token;
			}
		}
		else {
			// console.log(this.responseText);
			alert(this.responseText);
		}
	}

	function getCode() {
		let code = null;
		const queryString = window.location.search;
		if (queryString.length > 0) {
			const urlParams = new URLSearchParams(queryString);
			code = urlParams.get('code');
		}
	/* 	alert('Code: ' + code); */
		return code;
	}

	function onPageLoad() {
		if (window.location.search.length > 0) {
			handleRedirect();
		}
	}

	onPageLoad();

</script>
