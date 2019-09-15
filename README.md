# liri-node-app
This assignment is to make LIRI, a _Language_ Interpretation and Recognition Interface. LIRI will be a command line node app that takes in parameters and gives you back data.

It's just like iPhone's Siri, but without using spoken language. LIRI is a command line node app.
LIRI is used to request data from several APIs based on user input by searching the APIs databases for the information and returns output
in a JSON format.

LIRI's environment is setup by importing NPM modules and packages:
dotenv: dotenv is a zero-dependency module that loads environment variables from a .env file into process.env. 
Command Line: 'npm install dotenv'
Request: - Request is designed to be the simplest way possible to make http calls. It supports HTTPS and follows redirects by default.
Command Line: 'npm install request'
Moment: - A lightweight JavaScript date library for parsing, validating, manipulating, and formatting dates.
Command Line: 'npm install moment'
Fs: - a built in node package
Run command "npm install" in Terminal to pul in NPM modules
Run command "npm install axios" in Terminal for AXIOS.
Run command "node liri.js" to execute the app and pass it some arguments.

The LIRI App is organized using several functions and a switch statement. LIRI includes logging support both to the console and an output file - log.txt.
It uses the npm node module, 'simple-node-logger', for it's logging solution.
"npm install simple-node-logger --save"
LIRI will search Spotify for songs, Bands in Town for concerts, and OMDB for movies.
spotify-this-song <song title> will display information about the song such as the artist, album name and a preview link
concert-this <Artist name> Will display upcoming concerts by the Artist.
movie-this <movie title> will information about the movie such as Rotten Tomatoes rating, year, plot, and actors
do-what-it-says takes the text from random.txt and executes it

Built With
Node.js
[Node-Spotify-API](https://www.npmjs.com/package/node-spotify-api)
[AXIOS](https://www.npmjs.com/package/axios)
[OMDB API](http://www.omdbapi.com) 
[Bands In Town API](http://www.artists.bandsintown.com/bandsintown-api)
[Moment](https://www.npmjs.com/package/moment)
[DotEnv](https://www.npmjs.com/package/dotenv)

Developer: Clifton Nwokeuku

Instructions:
To run LIRI:

