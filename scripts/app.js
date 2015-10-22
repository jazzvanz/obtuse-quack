var app = {};
app.key = '4864244b3d4841378314f6b6d52487d';
app.zip = '';
app.radius = 10;
app.results = {};

//ajax search call, create global call app.results to store all results

app.searchLocale = function() {
	$.ajax({
		url :'https://api.meetup.com/find/groups?',
		dataType: 'jsonp', 
		method: 'GET',
		data: {
			key: app.key,
			category: '34',
			zip: app.zip,
			radius: app.radius
			}
		}).then(function(res) {
				//Using .data to go a level deeper into res then storing as method in app
				app.results = res.data;
				app.displayResults(app.results);
	});
}; 





//ask for geolocation

//geolocation fills city search box, if no geolocation, they can enter manually

//search box allows for searching description

//drop-down for date

//they can use any combo of date, location, or both

//submit button to initiate search

//display list of matched results
app.displayResults = function(res) {

		$.each(res, function(index, value) {
			var name = res[index].name;
			var link = res[index].link;
			var description = $(res[index].description).text();
			var city = res[index].city;
			var country = res[index].country;
			var state = res[index].state;
			var timezone = res[index].timezone;
//			var time = res[index].next_event.time;
			var photo = res[index].group_photo.photo_link;
			console.log(name, link, description, city, country, state, timezone, photo);
		});
		
}; 

//form submit button push!
app.formSubmit = function(){
	app.searchLocale();
};




// Init app
app.init = function() {
	app.formSubmit();
};

// Run app Run!!
$(document).ready(function(){
  app.init();
});