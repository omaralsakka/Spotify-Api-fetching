var array = new Array();

items = localStorage.getItem('data');
console.info(items);
items = jQuery.parseJSON(items);
jQuery.each(items, function(key, value){
	fetchMe(value);
})

var i = 0;
async function fetchMe(value){
	$(document).ready(function(){
		let playlist = $('<div class="list" id="list' + i + '"></div>').hide();
		let navItem;
		let list = value.album.name;
		console.log(list);
		// navItem onclick it will toggle that current list with using the same index
		navItem = $("<div class='navItem' onclick=$('#list"+ i +"').toggle(200,'linear')>" + list + "</div>");
		list = $('<h1 id="list_name"> <a href="'+ value.album.external_urls.spotify + '">' + list +'</a></h1>');
		$(playlist).append(list);
		$(".navbar").append(navItem);
		//for each tracks in single object, create its elements then add it to the playlist tag
		$.each(value.album.tracks.items, function(key, val){
			let hrf = val.external_urls.spotify;
			let aName = value.album.artists[0].name;
			let tTitle = val.name;
			let tYear = value.album.release_date;

			// let list = value.substring(0, value.indexOf(".json"));
			let anchor = $("<a href='"+ hrf + "' target='__blank'></a>");
			let img = $("<img id='artwork' src='" + value.album.images[1].url + "'>");
			let txt = $("<div class='cTxt'>" + aName + "</br>" + tTitle + "</br>" + tYear + "</div>");

			// fixed tracks so styling is there.
			let track = $("<div class='track' id='track"+ i + "'></div>")
			$(anchor).append(img);
			$(anchor).append(txt);
			$(track).append(anchor);
			$(playlist).append(track);
		})
		i += 1;

		//we append the playlist to the main page container
		$("#container").append(playlist);
	});
}
