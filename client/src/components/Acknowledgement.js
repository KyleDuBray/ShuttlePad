import React from "react";

const Acknowledgement = ({ metaData }) => {
  return metaData.photoUrl !== "" && metaData.authorUrl !== "" ? (
    <div className="ack-container">
      <a href={metaData.photoUrl}>Photo</a> by{" "}
      <a href={metaData.authorUrl}>{metaData.authorName}</a> on{" "}
      <a href="https://unsplash.com">Unsplash</a>
    </div>
  ) : null;
};

export default Acknowledgement;
