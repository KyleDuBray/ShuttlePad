import React, { useEffect, useState } from "react";
import moment from "moment";
import "../styles/time.css";

const Time = () => {
  const [currentTime, setCurrentTime] = useState(moment().format("LTS"));

  useEffect(() => {
    setInterval(() => {
      setCurrentTime(moment().format("LTS"));
    }, 1000);
  }, []);

  return (
    <div className="time-container">
      <h2>{currentTime}</h2>
    </div>
  );
};

export default Time;
