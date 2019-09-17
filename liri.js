//Read and set any environment variables with the NPM and dotenv package:

require("dotenv").config();

const fs = require("fs");
const moment = require("moment");

const axios = require("axios");
const Spotify = require("node-spotify-api");

const keys = require("./keys.js");
//const inquirer = require('inquirer');

//Output file for logs.
const filename = './log.txt';

//NPM module used for logging solution.
const log = require('simple-node-logger').createSimpleFileLogger( filename );

//All log information printed to log.txt.
log.setLevel('all');

let userInput = process.argv;
let inputChoice = process.argv[2];

//LIRI will search Spotify for songs, Bands in Town for concerts, and OMDB for movies.

//This function will search the Bands in Town Artist Events API for a Band/Artist and render the following information about each event to the terminal:

function bandsInTown(){
    let artist = "";
    for (let i = 3; i < userInput.length; i++){
        if (i > 3 && i < userInput.length){
            artist = artist + "+" + userInput[i];
        }
        else{
            artist += userInput[i];
        }
    }
    if (userInput.length < 4) {
        artist = "Cardi B";
    }

    let queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
    
    logOutput(queryURL); 

    axios.get(queryURL).then(
        function(bandResponse){
            logOutput("Venue: " + bandResponse.data[0].venue.name);
            logOutput("City: " + bandResponse.data[0].venue.city);
            logOutput(moment(bandResponse.data[0].datetime).format("MM/DD/YYYY"));
        })
        .catch(function (error) {
            console.log("NOTHING FOUND");
          });
    };


//This function will show the following information about the song in your terminal/bash window Artist(s), The song's name, A preview link of the song from Spotify, 
//and the album that the song is from.

 function songChoice(){
    let songName = "";
    for (let i = 3; i < userInput.length; i++){
        if (i > 3 && i < userInput.length){
            songName = songName + "+" + userInput[i];
        }
        else{
            songName += userInput[i];
        }
    }
    if (userInput.length < 4) {
        songName = "Ace of Base The Sign";
    }
    
    let spotify = new Spotify(keys.spotify)

    spotify.request('https://api.spotify.com/v1/search?q=track:' + songName + '&type=track', function(error, songResponse) {
        if (error){
           // return logOutput(error);
            return logOutput("NOTHING FOUND");
        }
        logOutput("Artist: " + songResponse.tracks.items[0].artists[0].name);
        logOutput("Song: " + songResponse.tracks.items[0].name);
        logOutput("URL: " + songResponse.tracks.items[0].preview_url);
        logOutput("Album: " + songResponse.tracks.items[0].album.name);
    });
};

//This function will output the following information to your terminal/bash window: Title of the movie, Year the movie came out, IMDB Rating of the movie, 
//Rotten Tomatoes Rating of the movie, Country where the movie was produced. Language of the movie, Plot of the movie, Actors in the movie.

function movieChoice(){
 
    let movieName = "";

    for (let i = 3; i < userInput.length; i++){
        if (i > 3 && i < userInput.length){
            movieName = movieName + "+" + userInput[i];
        }
        else{
            movieName += userInput[i];
        }
    };

    if (userInput.length < 4) {
        movieName = "Mr. Nobody";
    }
    
    let queryURL = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=f3f1608e";


    axios.get(queryURL).then(
        function(movieResponse){
            logOutput("Title: " + movieResponse.data.Title);
            logOutput("Year: " + movieResponse.data.Year);
            logOutput("Rated: " + movieResponse.data.imdbRating);
            logOutput("Country: " + movieResponse.data.Country);
            logOutput("Language: " + movieResponse.data.Language);
            logOutput("Plot: " + movieResponse.data.Plot);
            logOutput("Actors: " + movieResponse.data.Actors);
            logOutput("Rotten Tomatoes: " + movieResponse.data.Ratings[1].Value);
        })
        .catch(function (error) {
            console.log("NOTHING FOUND");
          });
    };

//Using the `fs` Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.
//It should run `spotify-this-song` for "I Want it That Way," as shown in the text in `random.txt`.

function doWhatItSays() {

    fs.readFile("random.txt", "utf8", function(error, data) {
      if (error) {
        return logOutput(error);
      }
        let output = data.split(",");
        for (let i = 0; i < output.length; i++) {
            logOutput(output[i]);
        }
      });
};

//Setting up the Switch Statement based on the user input to complete the API request.
//Switch Statement with logging information from user input.

switch (inputChoice){
    case "concert-this":
        logOutput("=====================================================================");
        logOutput("user command: " + userInput[2] + "   user arguments: " + process.argv.slice(3).join(" "));
        bandsInTown();
        break;
    
    case "spotify-this-song":
        logOutput("=====================================================================");
        logOutput("user command: " + userInput[2] + "   user arguments: " + process.argv.slice(3).join(" "));
        songChoice();
        break;
    
    case "movie-this":
        logOutput("=====================================================================");
        logOutput("user command: " + userInput[2] + "   user arguments: " + process.argv.slice(3).join(" "));
        movieChoice();
        break;

    case "do-what-it-says":
        logOutput("=====================================================================");
        logOutput("user command: " + userInput[2] + "   user arguments: " + process.argv.slice(3).join(" "));
        doWhatItSays();
        break;
}

//Logs data to the terminal and output to a text file called log.txt.

function logOutput(logText) {
	log.info(logText);
    let str = "---------------------";
    //Suppresses console logging users commands to terminal output, since users can see what they typed.
    console.log(logText.replace(/^user command.*$\n?/gm, ''));
}