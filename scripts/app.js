
	// TECH MEETUPS
		// JS/jQuery

// Coded by Jazzmin Vangeel, Giordan Battaglin and Andrew Dyke
// Oct. 2015
// This application uses the Meet Up API

var app = {};
app.key = '4864244b3d4841378314f6b6d52487d';
app.zip = '';
app.radius = 25;
app.date = '';
app.results = {};

app.offsetNum = 0;

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
			radius: app.radius,
			page: 10,
			offset: app.offsetNum
		}
		}).then(function(res) {
				//Using .data to go a level deeper into res then storing as method in app
				app.results = res.data;
				// Calling our displayResults function and passing it the results from our ajax request
				app.displayResults(app.results);

				$('.loadMore').removeClass('hide');

				if (app.offsetNum === 0) {
					
				}

				//Call counter to add 1 to offset number
				app.counter(app.offsetNum);
	});
}; 

app.counter = function(counter) {
//	smoothscrolls on the initial search only
	if (app.offsetNum === 1){
		$.smoothScroll({
						scrollTarget: '#dynaContent'
					});
	}
	
	app.offsetNum = app.offsetNum + 1;
};

//form submit button push!
app.formSubmit = function() {
	$('#submit').on('click', function(e) {
		e.preventDefault();
		
		app.zip = $('#address').val().toUpperCase();
		
//		test to make sure a valid us or canadian zip/postal was entered
//		shows the h3 error element to log error msg to user
		
		if (is.caPostalCode(app.zip) === true || is.usZipCode(app.zip) === true){
			app.searchLocale();
			app.date = $( '#unixDate' ).val();
			$( '.error' ).addClass( 'invisible' ).removeClass( 'visible' );
			
		} else {
			$( '.error' ).text('Please enter a valid US or Canadian Zip / Postal Code').addClass( 'visible' ).removeClass( 'invisible' );
		}
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
			var description = $("<div>" + res[index].description + "</div>").text();

			if (description.length > 300) {
				// Trim the string to 30 characters
				description = description.substring(0, 300) + '... ';
			}
//			define variables
			var city = '';
			var state = '';
			var country = '';
			var timezone = '';
			var time = '';
//			check if there is a start time entered for event, otherwise var time is equal to error msg
			if (res[index].next_event === undefined){
				time = 'Sorry, no start time has been entered.';
			}else{
				city = res[index].city;
				state = res[index].state;
				country = res[index].country;
				timezone = res[index].timezone;
	//	convert epoch time to formatted date, keeping epoch in a separate variable
				timeEpoch = res[index].next_event.time;
				time = new Date (res[index].next_event.time);
				time = time.toString();
			}

			
			// if photo link is defined do regular thing, otherwise use our backup image
			// falsey values: 0, undefined, null, NULL, false
			// truthy values: any other value including true
			var photoLink = '';
			if ( res[index].group_photo && res[index].group_photo.photo_link ) {
				photoLink = res[index].group_photo.photo_link;
			} else {
				photoLink = 'assets/noImageMeetup.png';
			}

// Creating HTML elements to display to user

			// Make an H2 tag with the name variable inside it
			name = $('<h2>').text(name);
			
//check if city, state, and country returned values, N/A msg to user if not
			if(city === ''){
				city = 'N/A';
				state = 'N/A';
				country = 'N/A';
			}
			
			// Make a p tag with the concatenated values of city, state, country, time and timezone
			var place = $('<p>').addClass('timeZone').text(city + ", " + state + ", " + country + " (" + time + " " + timezone +")");

			// Make an image tag and assign an src and alt attribute to it

			var photo = $('<img>').attr('src', photoLink).attr('alt', 'A picture of the event');

			// Adding a link to the image we just made so user can click image to get to original event source
			var linkImage = $('<a>').attr('href', link).attr('target', '_blank').append(photo);
			var photoDiv = $('<div>').addClass('eventPhoto').append(linkImage);
			
			// Add a paragraph tag with the description in it
			description = $('<p>').addClass('description').text(description);
			
//			add a read more link at the end of each result which opens same url img tag uses
			var readMore = $( '<a>' ).attr('href', link).addClass('readMore').text('Read more...');
			
			var desBox = $("<div>").addClass("descriptBox").append(name, place, description, readMore);

			
			// Make a div with a class of eventBox and append(insert) within it the variables we just made to make a div with an H2, img, and two p tags inside it with all the info we want our user to see.
			var eventBox = $('<div>').addClass('eventBox wrapper').append(desBox, photoDiv);

//	only show results from selected date onwards
			if (timeEpoch >= app.date){
				$('#dynaContent').append(eventBox);
			}else{
				return;
			}
		});
};


// Load More Button
$('.loadMore').on('click', function(event){
		// prevent default form submission and instead
		event.preventDefault();
		app.searchLocale();
});


// Init app
app.init = function() {
	app.formSubmit();
//	function of calendar widget for text field
//	altField is not shown to user, and submits epoch time to the hidden html input #unixDate
	$( '#datepicker' ).datepicker({
		altField: '#unixDate',
		altFormat: '@',
		dateFormat: 'mm-dd-yy'
	});

	app.offsetNum = app.offsetNum + 1;
};

// Run app Run!!
$(document).ready(function(){
  app.init();
});