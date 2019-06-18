require("dotenv").config();
var moment = require('moment');
var axios = require("axios")
var keys = require("./keys.js");
var Spotify = require("node-spotify-api")


var input = process.argv
console.log(input)
var operation = input[ 2 ]
var keyQuery = ""

for (i = 3; i < input.length; i++) {

    keyQuery = keyQuery.concat(input[ i ] + " ");
}
keyQuery = keyQuery.trim();
console.log(operation, keyQuery)

switch (operation) {
    case "concert-this":
        console.log("concert");
        getMyBands(keyQuery);
        break;
    case "spotify-this-song":
        console.log("spotify");
        getMeSpotify(keyQuery);
        break;
    case "movie-this":
        console.log("movie");
        getMeMovie(keyQuery);
        break;
    case "do-what-it-says":
        doWhatItSays();
        break;
    default:
        console.log("LIRI doesn't know that");
}

function getMyBands () {
    var artist = keyQuery;
    var urlBands = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
    axios.get(urlBands).then(function (response) {
        // console.log(response.data)
        var api = response.data;
        console.log("number: ", api.length)

        for (var i = 0; i < api.length; i++) {
            var name = api[ i ].venue.name
            var country = api[ i ].venue.country
            var date = moment(api[ i ].datetime).format("MM/DD/YYYY")
            console.log("-----------");
            console.log("Venue Name: " + name);
            console.log("Country: " + country);
            console.log("Concert Date: " + date);
            console.log("-----------");


        }
    })
}

function getMeSpotify () {
    // var Spotify = require('node-spotify-api');

    // var spotify = new Spotify({
    //   id: <your spotify client id>,
    //   secret: <your spotify client secret>
    // });
    var spotify = new Spotify(keys.spotify);

    spotify.search({ type: 'track', query: keyQuery }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        //console.log(response.tracks.items)
        var api = data.tracks.items;
        // console.log(api[0])
     
        for (var i = 0; i < api.length; i++) {
            var artists = []
            for(var j = 0; j < api[i].artists.length; j++){
                artists.push(api[i].artists[j].name)
            }
    
            console.log("----------------" + i + "-------------------");
            console.log("Artist(s): " + artists.join(", "));
            console.log("Song Name: " + api[i].name);
            console.log("Preview Song: " + api[i].preview_url);
            console.log("Album: " + api[i].album.name);
            console.log("-------------------------------------------");
          }
        // console.log(data.tracks.items[0])
        // Artist(s)
        // The song's name
        // A preview link of the song from Spotify
        // The album that the song is from
    });
}

function getMeMovie () {
    var urlmovie = "http://www.omdbapi.com/?t=" + keyQuery + "&y=&plot=full&tomatoes=true&apikey=trilogy";
    axios.get(urlmovie).then(function (response) {
        // console.log(response.data)
        var api = response.data;


        var title = api.Title
        var year = api.Year
        var imdbRating = api.imdbRating
        var rotrating = api.Ratings[ 1 ].Value
        var country = api.Country
        var language = api.Language
        var plot = api.Plot
        var actors = api.Actors
        console.log("-----------");
        console.log("Title: " + title);
        console.log("Year: " + year);
        console.log("imdbRating: " + imdbRating);
        console.log("Rotten Tomatoes Rating: " + rotrating);
        console.log("Country: " + country);
        console.log("Language: " + language);
        console.log("Plot: " + plot);
        console.log("Actors: " + actors);
        console.log("-----------");


        //   * Title of the movie.
        //   * Year the movie came out.
        //   * IMDB Rating of the movie.
        //   * Rotten Tomatoes Rating of the movie.
        //   * Country where the movie was produced.
        //   * Language of the movie.
        //   * Plot of the movie.
        //   * Actors in the movie.
    })

}

function doWhatItSays () { }
