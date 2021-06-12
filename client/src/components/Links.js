import React from "react";

import { useSelector } from "react-redux";

import LinkItem from "./LinkItem";
import AddLink from "./AddLink";
import DeleteLinksToggler from "./DeleteLinksToggler";

import { ModalProvider } from "../contexts/ModalContext";
import { DeleteLinkProvider } from "../contexts/DeleteLinkContext";

const Links = () => {
  const state = useSelector((state) => state.links);

  const renderLinks = () => {
    return state.linksList.map((link, i) => {
      return <LinkItem key={i} url={link.url} siteName={link.siteName} />;
    });
  };

  return (
    <div className="links-container">
      <DeleteLinkProvider>
        <DeleteLinksToggler />
        {renderLinks()}
      </DeleteLinkProvider>
      <ModalProvider>
        <AddLink />
      </ModalProvider>
    </div>
  );
};

export default Links;
