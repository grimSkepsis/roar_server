// Google OAuth Configuration
var googleConfig = {

};

// Dependency setup
var express = require('express'),
  moment = require('moment'),
  google = require('googleapis');

// Initialization
var app = express(),
  calendar = google.calendar('v3'),
  API_KEY = "AIzaSyBlxdzRtWHrk7cBcPIMaprt0xMdNqswA-I",
  eventObject = {};

function getData(){
  // Format today's date
  var today = moment().format('YYYY-MM-DD') + 'T';

  // Call google to fetch events for today on our calendar
  calendar.events.list({
    key: API_KEY,
    calendarId: googleConfig.calendarId,
    maxResults: 50,
    timeMin: today + '00:00:00.000Z',

    //timeMax:endDay + '23:59:59.000Z',
    singleEvents: true,
    orderBy:'startTime'
  }, function(err, events) {
    if(err) {
      console.log('Error fetching events');
      console.log(err);
    } else {
      // Send our JSON response back to the browser
      console.log('Successfully fetched events');
      eventObject = events;
    }
  });
}

getData();
var interval = setInterval(function(){getData();}, 300000);
// Response for localhost:2002/
app.get('/', function(req, res) {
  console.log("returning events");
  res.send(eventObject);
});

var server = app.listen(2002, function() {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Listening at http://%s:%s', host, port);
});
