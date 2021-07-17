import React from "react";

const Hamburger = (props) => {
  return (
    <div
      className={`nav-icon ${props.open ? "open" : null}`}
      onClick={() => {
        props.handleOpen();
      }}
    >
      <span />
      <span />
      <span />
    </div>
  );
};

export default Hamburger;
