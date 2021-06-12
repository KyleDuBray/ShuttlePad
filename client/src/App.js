import "./styles/base.css";
import "./styles/landing.css";
import "./styles/widgets.css";
import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";

import { ReactComponent as Logo } from "./icons/logo.svg";
import Weather from "./components/Weather";
import Links from "./components/Links";
import moment from "moment";
import Time from "./components/Time";
import background from "./img/background.jpg";
import Acknowledgement from "./components/Acknowledgement";

const App = () => {
  const [fetchedImg, setFetchedImg] = useState("");
  const [fetchedData, setFetchedData] = useState({});
  useEffect(() => {
    const getImg = async () => {
      try {
        const response = await axios.get("/api/unsplash");
        setFetchedImg(response.data.urls.regular);
        setFetchedData(response.data);
        console.log(response.data);
      } catch (err) {
        console.error(err);
        setFetchedImg(background);
      }
    };
    getImg();
  }, []);

  const getImageMetadata = useCallback(() => {
    let imageInfo;
    console.log(Object.keys(fetchedData).length);
    if (Object.keys(fetchedData).length !== 0) {
      imageInfo = {
        photoUrl: fetchedData.links.html,
        authorUrl: fetchedData.user.links.html,
        authorName: `${fetchedData.user.name}`,
      };
    } else imageInfo = { photoUrl: "", authorUrl: "" };

    console.log(imageInfo);

    return imageInfo;
  }, [fetchedData]);

  const getGreeting = () => {
    const time = moment().format("LTS");
    const timeOfDay = time.charAt(time.length - 2);
    switch (timeOfDay) {
      case "A":
        return "Good Morning";
      case "P":
        const hour = parseInt(time.substring(0, 2));
        if (hour < 5 || hour === 12) {
          return "Good Afternoon";
        } else return "Good Evening";
      default:
        return null;
    }
  };

  return (
    <>
      <div
        style={{
          backgroundImage: `linear-gradient(to top, #fffdfd00, #ffffff91), url(${fetchedImg})`,
        }}
        className="landing"
      >
        <Logo className="logo" />
        <div className="main-text">
          <h1>{getGreeting()}</h1>
          <Weather />
          <Time />
        </div>
        <div className="widgets-container">
          <Links />
        </div>
        <Acknowledgement metaData={getImageMetadata()} />
        <div className="footer">
          &copy; Copyright {new Date().getFullYear()} Kyle DuBray. All Rights
          Reserved
        </div>
      </div>
    </>
  );
};

export default App;
