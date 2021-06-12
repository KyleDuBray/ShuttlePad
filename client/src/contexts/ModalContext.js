import React, { useContext, useState } from 'react';

const ModalContext = React.createContext();
const ToggleModalContext = React.createContext();

export const useModal = () => useContext(ModalContext);
export const useToggleModal = () => useContext(ToggleModalContext);

export const ModalProvider = ({ children }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const toggleModal = () => setModalOpen(!modalOpen);

  return (
    <ModalContext.Provider value={modalOpen}>
      <ToggleModalContext.Provider value={toggleModal}>
        {children}
      </ToggleModalContext.Provider>
    </ModalContext.Provider>
  );
};
