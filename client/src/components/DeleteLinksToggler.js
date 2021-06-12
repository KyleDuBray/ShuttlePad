import React from 'react';
import Button from './Button';
import { useToggleDeleteLink } from '../contexts/DeleteLinkContext';

const DeleteLinksToggler = () => {
  const toggleDelete = useToggleDeleteLink();

  return (
    <Button
      handleClick={toggleDelete}
      content={<ion-icon name="menu-outline"></ion-icon>}
      outerClass="toggledelete"
      innerClass="toggledelete-span"
    />
  );
};

export default DeleteLinksToggler;
