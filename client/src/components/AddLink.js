import React from "react";

import "../styles/button.css";

import { useToggleModal } from "../contexts/ModalContext";
import AddLinkModal from "./AddLinkModal";
import Button from "./Button";

const AddLink = () => {
  const toggle = useToggleModal();

  return (
    <div className="addlink-container">
      <Button
        handleClick={toggle}
        content={"+ New"}
        outerClass="addlink"
        innerClass="add-span"
      />
      <AddLinkModal />
    </div>
  );
};

export default AddLink;
