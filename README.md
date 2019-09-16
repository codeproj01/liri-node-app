# liri-node-app
This assignment is to make LIRI, a _Language_ Interpretation and Recognition Interface. LIRI will be a command line node app that takes in parameters and gives you back data.

It's just like iPhone's Siri, but without using spoken language. LIRI is a command line node app.
LIRI is used to request data from several APIs based on user input by searching the APIs databases for the information and returns output
in a JSON format.

LIRI's environment is setup by importing NPM modules and packages:
* dotenv: dotenv is a zero-dependency module that loads environment variables from a .env file into process.env. 
* Command Line: 'npm install dotenv'

* Request: - Request is designed to be the simplest way possible to make http calls. It supports HTTPS and follows redirects by default.
* Command Line: 'npm install request'

* Moment: - A lightweight JavaScript date library for parsing, validating, manipulating, and formatting dates.
* Command Line: 'npm install moment'

Fs: - a built in node package

* Run command "npm install" in Terminal to pul in NPM modules
* Run command "npm install axios" in Terminal for AXIOS.

The LIRI App is organized using several functions and a switch statement. LIRI includes logging support both to the console and an output file - log.txt.
It uses the npm node module, 'simple-node-logger', for it's logging solution.

"npm install simple-node-logger --save"

* **Built With.**
```
1. Node.js.
2. [Node-Spotify-API](https://www.npmjs.com/package/node-spotify-api).
3. [AXIOS](https://www.npmjs.com/package/axios).
4. [OMDB API](http://www.omdbapi.com). 
5. [Bands In Town API](http://www.artists.bandsintown.com/bandsintown-api).
6. [Moment](https://www.npmjs.com/package/moment).
7. [DotEnv](https://www.npmjs.com/package/dotenv).
```

* **Developer: Clifton Nwokeuku - The University of Minnesota Coding Boot Camp.**

Instructions on how liri-node-app works:

LIRI will search Spotify for songs, Bands in Town for concerts, and OMDB for movies.

spotify-this-song "song title" will display information about the song such as the artist, album name and a preview link.
concert-this "Artist name" Will display upcoming concerts by the Artist.
movie-this "movie title" will return information about the movie such as Rotten Tomatoes rating, year, plot, and actors.
do-what-it-says takes the text from random.txt and executes it.

Best practise will be to type argv[4] strings in ' ' or " " (Example: node liri movie-this 'The Firm').
But it will work the same without them. It helps with logging.

To run LIRI: Type *"node liri.js"* to execute the app, pass it the requisite command & args (See examples below).
```
At the terminals command prompt, type "node liri.js concert-this [your bands or artist name]" (See screenshot example below:).
```
![Alt text](./slides/concert-this.jpg?raw=true "$ node liri concert-this metallica").
```
At the terminals command prompt, type "node liri.js spotify-this-song *[your song name]*" (See screenshot example below:).
```
![Alt text](./slides/spotify-this-song.jpg?raw=true "$ node liri spotify-this-song Thriller").
```
At the terminals command prompt, type "node liri.js movie-this [your movie's title name]" (See screenshot example below:).
```
![Alt text](./slides/movie-this.jpg?raw=true "$ node liri movie-this heat").
```
At the terminals command prompt, type "node liri.js do-what-it-says". Here, LIRI will pull text from inside a txt file and use it to call one of its commands. 
In this example, spotify-this-song,"I want it that way" is from the txt file.(See screenshot example below:).
```
![Alt text](./slides/do-what-it-says.jpg?raw=true "$ node liri do-what-it-says").
```
At the terminals command prompt, type "node liri.js spotify-this-song [without an argument: ie song name]". 
Program will default to "The Sign by Ace of Base". (See screenshot example below:).
```
![Alt text](./slides/spotify-this-song-no-args.jpg?raw=true "$ node liri spotify-this-song without a song name you get the default song").
```
At the terminals command prompt, type "node liri.js movie-this [without an argument: ie movie name]".
Program will default to "Mr. Nobody". (See screenshot example below:).
```
![Alt text](./slides/movie-this-no-args.jpg?raw=true "$ node liri movie-this without a movie name you get the default movie").
```
At the terminals command prompt, type "node liri.js concert-this [without an argument: ie band name or artist]". 
Program will default to "Cardi. B". (See screenshot example below:).
```
![Alt text](./slides/concert-this-no-args.jpg?raw=true "$ node liri concert-this without a Band name you get a default Artist/Band").

