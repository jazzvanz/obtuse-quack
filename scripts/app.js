var app = {};
app.key = '4864244b3d4841378314f6b6d52487d';
app.zip = '';
app.radius = 20;
app.date = '';
app.results = {};

var altFormat = $( "#datepicker" ).datepicker( "option", "altFormat" );

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
				// Calling our displayResults function and passing it the results from our ajax request
				app.displayResults(app.results);
	});
}; 

//form submit button push!
app.formSubmit = function(){
	$('#submit').on('click', function(e){
		e.preventDefault();
		$('#dynaContent').empty();
		app.zip = $('#address').val();
		app.searchLocale();
		app.date = $( '#unixDate' ).val();

		console.log(app.date);
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

			// Storing data in variables we can use to output to user
			var name = res[index].name;
			var link = res[index].link;
			// This jquery you see here removes html from the string within res[index].description. We wrapped the value of res[index].description with a div so that the jquery function .text() which expects html in the value will ALWAYS have html to remove. If a value comes from our API but has no HTML in it, it would otherwise give us an error. SO - we hack .text() by wrapping the value with html so it will always work and give us back just text like we want.
			var description = $("<div>" + res[index].description + "</div>").text();

			if (description.length > 300) {
				// Trim the string to 30 characters
				description = description.substring(0, 300) + '... ';
			}

			var city = res[index].city;
			var state = res[index].state;
			var country = res[index].country;
			var timezone = res[index].timezone;
		//var time = res[index].next_event.time;

			// if photo link is defined do regular thing, otherwise use our backup image
			// falsey values: 0, undefined, null, NULL, false
			// truthy values: any other value including true
			var photoLink = '';
			if ( res[index].group_photo && res[index].group_photo.photo_link ) {
				photoLink = res[index].group_photo.photo_link;
			} else {
				photoLink = 'images/noPhoto.jpg';
			}

// Creating HTML elements to display to user

			// Make an H2 tag with the name variable inside it
			name = $('<h2>').text(name);

			// Make a p tag with the concatenated values of city, state, country and timezone
			var place = $('<p>').addClass('timeZone').text(city + ", " + state + ", " + country + ", (" + timezone + ")");

			// Make an image tag and assign an src and alt attribute to it

			var photo = $('<img>').attr('src', photoLink).attr('alt', 'A picture of the event');

			// Adding a link to the image we just made so user can click image to get to original event source
			var linkImage = $('<a>').attr('href', link).append(photo);
			var photoDiv = $('<div>').addClass('eventPhoto').append(linkImage);
			
			// Add a paragraph tag with the description in it
			description = $('<p>').addClass('description').text(description);
			var desBox = $("<div>").addClass("descriptBox").append(name, place, description);

			// Make a div with a class of eventBox and append(insert) within it the variables we just made to make a div with an H2, img, and two p tags inside it with all the info we want our user to see.
			var eventBox = $('<div>').addClass('eventBox wrapper').append(desBox, photoDiv);

			//  Then place the recipeBox in an element with the id of recipe
			$('#dynaContent').append(eventBox);

			// $.smoothScroll({
			// 	scrollTarget: '#dynaContent'
			// });

		});
		
}; 



// Init app
app.init = function() {
	app.formSubmit();
//	function of calendar widget for text field
	$( '#datepicker' ).datepicker({
		altField: '#unixDate',
		altFormat: '@',
		dateFormat: 'mm-dd-yy'
	});
};

// Run app Run!!
$(document).ready(function(){
  app.init();
});