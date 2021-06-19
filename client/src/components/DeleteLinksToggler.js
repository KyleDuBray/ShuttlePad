import React from 'react';
import Button from './Button';
import {
  useDeleteLink,
  useToggleDeleteLink,
} from '../contexts/DeleteLinkContext';
import Hamburger from './Hamburger';

const DeleteLinksToggler = () => {
  const toggleDelete = useToggleDeleteLink();
  const deleteOpen = useDeleteLink();

  // TODO: Apply Hamburger (above) to Button convention below.
  return (
    <Button
      handleClick={toggleDelete}
      content={<Hamburger open={deleteOpen} handleOpen={toggleDelete} />}
      outerClass="toggledelete"
      innerClass="toggledelete-span"
    />
  );
};

export default DeleteLinksToggler;
