const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  PORT: process.env.PORT,
  WEATHER_KEY: process.env.WEATHER_KEY,
  UNSPLASH_KEY: process.env.UNSPLASH_KEY,
  UNSPLASH_SECRET: process.env.UNSPLASH_SECRET,
};
