var app = {};
app.key = '4864244b3d4841378314f6b6d52487d';

app.searchLocale = function() {
	$.ajax({
		url :'https://api.meetup.com/find/groups?',
		dataType: 'jsonp', 
		method: 'GET',
		data: {
			key: app.key,
			zip: 'm6j0a5',
			radius: '20'
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