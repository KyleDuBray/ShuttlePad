# ShuttlePad
An application to serve as a home page that includes quick links and a local weather display.

## Configuration and APIs

Before running this application, the following environment variables are needed:
UNSPLASH_KEY *Obtain from [Unsplash for Developers](https://unsplash.com/developers) to access their API for photo retrieval.*
WEATHER_KEY *Obtain from [Open Weather Map](https://openweathermap.org/api) to access their API for location-based weather retrieval.*
PORT *(for development)*


## Available Scripts

`npm run server` in the root directory will start the express server.
`npm start` in the client directory will start the react application. If changes are made only in the client directory, the server will not restart on save.

The heroku-postbuild script is used automatically by [Heroku](https://.heroku.com/) when deployed.

## NPM packages

