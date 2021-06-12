import React from 'react';
import ReactDOM from 'react-dom';
import '../styles/modal.css';
import AddLinkForm from './AddLinkForm';

import { useModal, useToggleModal } from '../contexts/ModalContext';

export default function AddLinkModal() {
  const isOpen = useModal();
  const toggle = useToggleModal();

  const handleCancel = () => toggle();

  const renderModal = () => {
    if (isOpen) {
      return (
        <div className="modal">
          <AddLinkForm handleCancel={handleCancel} />
        </div>
      );
    } else return null;
  };

  return ReactDOM.createPortal(renderModal(), document.querySelector('#modal'));
}
