require("dotenv").config();
var axios = require("axios")
// var keys = require("./keys.js");
// var Spotify = require("node-spotify-api")
// var spotify = new Spotify(keys.spotify);

// concert-this


// spotify-this-song


// movie-this


// do-what-it-says
var input = process.argv
console.log(input)
var operation = input[2]
var keyQuery = ""

for (i = 3; i < input.length; i++) {

keyQuery = keyQuery.concat(input[i] + " ");
}
keyQuery = keyQuery.trim();
console.log(operation,keyQuery)
switch (operation) {
    case "concert-this":
    getMyBands(keyQuery);
    break;
    case "spotify-this-song":
    getMeSpotify(keyQuery);
    break;
    case "movie-this":
    getMeMovie(keyQuery);
    break;
    case "do-what-it-says":
    doWhatItSays();
    break;
    default:
    console.log("LIRI doesn't know that");
    }
    function getMyBands(){}
    function getMeSpotify(){}
    function getMeMovie(){
        var urlmovie =
"http://www.omdbapi.com/?t=" + keyQuery + "&y=&plot=full&tomatoes=true&apikey=trilogy";
        axios.get(urlmovie).then(function(response){
            console.log(response.data)
        })

    }
    function doWhatItSays(){}
