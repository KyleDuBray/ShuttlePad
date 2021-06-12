import React, { useContext, useState } from "react";

const DeleteLinkContext = React.createContext();
const ToggleDeleteLinkContext = React.createContext();

export const useDeleteLink = () => useContext(DeleteLinkContext);
export const useToggleDeleteLink = () => useContext(ToggleDeleteLinkContext);

export const DeleteLinkProvider = ({ children }) => {
  const [deleteOpen, setDeleteOpen] = useState(false);

  const toggleDeleteLink = () => {
    setDeleteOpen(!deleteOpen);
  };

  return (
    <DeleteLinkContext.Provider value={deleteOpen}>
      <ToggleDeleteLinkContext.Provider value={toggleDeleteLink}>
        {children}
      </ToggleDeleteLinkContext.Provider>
    </DeleteLinkContext.Provider>
  );
};
