var app = {};
app.key = '4864244b3d4841378314f6b6d52487d';



//ajax call for location search (no date)
//
//app.searchLocation = function(){
//	$.ajax({
//		url: 'http://proxy.hackeryou.com',
//		method: 'GET',
//		dataType: 'json',
//		data: {
//			reqUrl: 'https://api.meetup.com/find/groups?key=4864244b3d4841378314f6b6d52487d&zip=m6j0a5&radius=20&category=34&order=members'
////			params: {
////				key: app.key,
////				zip: 'm6j0a5',
////				radius: '20'
////			}
//		}
//		}).then(function(res) {
//			console.log('res');		
//	});
//};

//app.searchLocation = function(){
//	$.ajax({
//		url: 'https://api.meetup.com/find/groups?key=4864244b3d4841378314f6b6d52487d&zip=m6j0a5&radius=20&category=34&order=members',
//		method: 'GET',
//		dataType: 'json'
//		});
//		}.then(function(res) {
//			console.log('res');		
//	});
app.searchLocale = function() {
	$.ajax({
		url :'http://proxy.hackeryou.com',
		dataType: 'json',
		method: 'GET',
		data: {
			reqUrl: 'https://api.meetup.com/find/groups?key=4864244b3d4841378314f6b6d52487d&zip=m6j0a5&radius=20&category=34&order=members'
	}
		}).then(function(res) {
				console.log(res);
	});
};

//ask for geolocation

//geolocation fills city search box, if no geolocation, they can enter manually

//search box allows for searching description

//drop-down for date

//they can use any combo of date, location, or both

//submit button to initiate search

//display list of matched results