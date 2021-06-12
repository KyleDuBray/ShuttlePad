const config = require("./config");
const express = require("express");
const path = require("path");
const axios = require("axios");
const cors = require("cors");
const schedule = require("node-schedule");

const app = express();
app.use(express.json());
app.use(cors());

const { PORT, WEATHER_KEY, UNSPLASH_KEY, UNSPLASH_SECRET } = config;

let currentPicture = {};

const job = schedule.scheduleJob("*/10 * * * *", async () => {
  console.log("Retrieving new image");
  const { data } = await axios
    .get(
      `https://api.unsplash.com/photos/random?client_id=${UNSPLASH_KEY}&orientation=landscape`
    )
    .catch((err) => {
      console.log(err);
      return;
    });
  currentPicture = data;
  console.log(data);
});

app.get("/api/weather/:latitude/:longitude", async (req, res) => {
  const { latitude, longitude } = req.params;
  const weather = await axios
    .get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${WEATHER_KEY}`
    )
    .catch((err) => {
      return res.status(400);
    });

  return res.status(201).send(weather.data);
});

app.get("/api/unsplash", async (req, res) => {
  return res.status(201).send(currentPicture);
});

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
