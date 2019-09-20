//Global environment variables and importing NPM and dotenv packages:

require("dotenv").config();

const fs = require("fs");
const moment = require("moment");

const axios = require("axios");
const Spotify = require("node-spotify-api");

const keys = require("./keys.js");
//const inquirer = require('inquirer');

//Output file for logs.
const filename = './log.txt';

//NPM module used for logging solution. simple-node-logger - npm
const log = require('simple-node-logger').createSimpleFileLogger( filename );

//All log information printed to log.txt.
log.setLevel('all');

let userInput = process.argv;
let inputChoice = process.argv[2];

//LIRI will search Spotify for songs, Bands in Town for concerts, and OMDB for movies.

//Start LIRI BOT

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
        movieChoice(userInput);
        break;

    case "do-what-it-says":
        logOutput("=====================================================================");
        logOutput("user command: " + userInput[2] + "   user arguments: " + process.argv.slice(3).join(" "));
        doWhatItSays();
        break;
}

//This function will search the Bands in Town Artist Events API for a Band/Artist and render the  specific information about each event to the terminal:

function bandsInTown(){
    
    let myArray = userInput;
    let artist = "";

    for (let i = 3; i < myArray.length; i++){
        if (i > 3 && i < myArray.length){
            artist = artist + "+" + myArray[i];
        }
        else{
           artist += myArray[i];
        }
    }
    
    if (myArray.length < 4) {
        artist = "Cardi B";
    }

    let queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
    
    logOutput(queryURL); 

    axios.get(queryURL).then(
        function(result){
            logOutput("Venue: " + result.data[0].venue.name);
            logOutput("City: " + result.data[0].venue.city);
            logOutput(moment(result.data[0].datetime).format("MM/DD/YYYY"));
        })
        .catch(function (error) {
            console.log("NOTHING FOUND");
          });
    };


//This function will show the following information about the song in your terminal/bash window Artist(s), The song's name, A preview link of the song from Spotify, 
//and the album that the song is from.

 function songChoice(){

    let myArray = userInput;
    let songName = "";
    
    for (let i = 3; i < myArray.length; i++){
        if (i > 3 && i < myArray.length){
            songName = songName + "+" + myArray[i];
        }
        else{
            songName += myArray[i];
        }
    }
    if (myArray.length < 4) {
        songName = "Ace of Base The Sign";
    }
    
    const spotify = new Spotify(keys.spotify)

    spotify.search({ type: 'track', query: songName  }, function(err, result) {
        if (err) {
        return logOutput("NOTHING FOUND");
        }
        logOutput("Artist: " + result.tracks.items[0].artists[0].name);
        logOutput("Song: " + result.tracks.items[0].name);
        logOutput("Preview Link: " + result.tracks.items[0].preview_url);
        logOutput("Album: " + result.tracks.items[0].album.name);
    });
};

//This function will output the following information to your terminal/bash window: Title of the movie, Year the movie came out, IMDB Rating of the movie, 
//Rotten Tomatoes Rating of the movie, Country where the movie was produced. Language of the movie, Plot of the movie, Actors in the movie.

function movieChoice(){

    let myArray = userInput;
    let movieName = "";

    for (let i = 3; i < myArray.length; i++){
        if (i > 3 && i < myArray.length){
            movieName = movieName + "+" + myArray[i];
        }
        else{
            movieName += myArray[i];
        }
    }
    
    if (myArray.length < 4) {
        movieName = "Mr. Nobody";
    }
    
    let queryURL = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=f3f1608e";

    //send requests using the axios package
    axios.get(queryURL).then(
        function(result){
            logOutput("Title: " + result.data.Title);
            logOutput("Year: " + result.data.Year);
            logOutput("Rated: " + result.data.imdbRating);
            logOutput("Rotten Tomatoes: " + result.data.Ratings[1].Value);
            logOutput("Country: " + result.data.Country);
            logOutput("Language: " + result.data.Language);
            logOutput("Plot: " + result.data.Plot);
            logOutput("Actors: " + result.data.Actors);
            
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


//Logs data to the terminal and output to a text file called log.txt.

function logOutput(logText) {
	log.info(logText);
    let str = "---------------------";
    //Suppresses console logging users commands to terminal output, since users can see what they typed.
    console.log(logText.replace(/^user command.*$\n?/gm, ''));
}