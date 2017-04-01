// declaring command variables
var action = process.argv[2];
// either the name of a song, or movie
var value = process.argv[3];

// switch case for whatever command the user enters
switch(action){
    case 'my-tweets':
        twitter();
    break;

    case 'spotify-this-song':
        spotify();
    break;

    case 'movie-this':
        movie();
    break;

    case 'do-what-it-says':
        doit();
    break;

    default:
    break;
}

// Twitter Function
function twitter(){
  // twitter keys variable, referencing the keys file and export line
  var twitterKeys = require('./keys.js').twitterKeys;
  // npm package
  var Twitter = require('twitter');
  // assigning the keys
  var client = new Twitter ({
		consumer_key: twitterKeys.consumer_key,
		consumer_secret: twitterKeys.consumer_secret,
		access_token_key: twitterKeys.access_token_key,
		access_token_secret: twitterKeys.access_token_secret
  });
  // What to look for
  var find = {screen_name: 'nbunruh'};

  // 'Get' the tweets using npm 
  client.get('statuses/user_timeline', find, function(error, tweets) {
    
    if (error) {
      console.log(error);
    }
    else {
      // for loop to run through the length of mytweets
      console.log("---------------------TWITTER RESULTS---------------------");
      for(i = 0; i < tweets.length; i++){
        // adds a number and dot before to show order
        console.log((i + 1) + ". " + tweets[i].text);
      }
    }
  });
}


// Spotify Function
function spotify() {
  //npm package
  var spotify = require('spotify');

  spotify.search({type: 'track', query: value || 'ace of base the sign'}, function(err, data) {
    if (err) {
        console.log('Error occurred: ' + err);
        return;
    }
    else {

    var spotifyCall = data.tracks.items[0];

// Consoles data from API
    console.log("---------------------SPOTIFY RESULTS---------------------");
    var artist = spotifyCall.artists[0].name;
    console.log("Artist: " + artist);
    var song = spotifyCall.name;
    console.log("Song name: " + song);
    var preview = spotifyCall.preview_url;
    console.log("Preview Link: " + preview);
    var album = spotifyCall.album.name;
    console.log("Album: " + album);

}
});
}

//OMDB Function
function movie() {
//NPM package
var request = require('request');
// Set movie name equal to the input
var movieName = value;
var movieDefault = "Mr.Nobody";
// search url variable
var url = 'http://www.omdbapi.com/?t=' + movieName + '&y=&plot=short&r=json';
var urlDefault = 'http://www.omdbapi.com/?t=' + movieDefault + '&y=&plot=short&r=json';

 // If the user entered a title, go get it
 if (movieName != null) {
    request(url, function (error, response, body) {
      // If the request is successful
      if (!error && response.statusCode == 200) {
              // Parse the body and pull for each attribute
              console.log("---------------------MOVIE RESULTS---------------------")
              console.log("Title: " + value);
              console.log("Year: " + JSON.parse(body)["Year"]);
              console.log("Rating: " + JSON.parse(body)["imdbRating"]);
              console.log("Country of Production: " + JSON.parse(body)["Country"]);
              console.log("Language: " + JSON.parse(body)["Language"]);
              console.log("Plot: " + JSON.parse(body)["Plot"]);
              console.log("Actors: " + JSON.parse(body)["Actors"]);
            };
      });

    // Mr. Nobody is default search term
    } else {
      request(urlDefault, function (error, response, body) {
        // If the request is successful (i.e. if the response status code is 200)
        if (!error && response.statusCode == 200) {
              console.log("Title: " + movieDefault);
              console.log("Year: " + JSON.parse(body)["Year"]);
              console.log("Rating: " + JSON.parse(body)["imdbRating"]);
              console.log("Country of Production: " + JSON.parse(body)["Country"]);
              console.log("Language: " + JSON.parse(body)["Language"]);
              console.log("Plot: " + JSON.parse(body)["Plot"]);
              console.log("Actors: " + JSON.parse(body)["Actors"]);
            };//end of if
      });//end of request
    } // end of else
  } // end of movie()

  /*function doit() {
    fs.readFile('random.txt', 'utf8', function(err, data) {
      if (error) {
      console.log(error);
    } else {
      console.log(data.toString());
    }

      var cmds = data.toString().split(',');

      app[cmds[0].trim()](cmds[1].trim());*/