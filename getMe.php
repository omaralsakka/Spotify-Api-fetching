<script src="https://code.jquery.com/jquery-3.6.0.js"></script>
<script>

	function getToken() {
		let code = null;
		const queryString = window.location.search;
		if (queryString.length > 0) {
			const urlParams = new URLSearchParams(queryString);
			code = urlParams.get('access_token');
		}
		/* alert('Token: ' + code); */
		return code;
	}

	const token = getToken();
	var dir = './jsons';
/* 	var fs = require('fs'); */

	//GET MY PROFILE DATA
	function getMyData() {
		// we create a directory to save the json files
/* 		if (!fs.existsSync(dir)){
			fs.mkdirSync(dir);
		} */
		$.ajax(
		{
			method: "GET",
			headers: {
				'Authorization': 'Bearer ' + token,
				'Content-Type': 'application/json'
			},
			url: 'https://api.spotify.com/v1/me/albums',
			success: function(data) {
				// console.log(data);
				// console.log(data.items);
				localStorage.setItem("data", JSON.stringify(data.items));
			 	window.location.href = "frontend.html";
			}
		})
	};
	getMyData();
</script>
