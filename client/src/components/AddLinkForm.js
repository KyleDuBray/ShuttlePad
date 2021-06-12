import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  createLink,
  updateName,
  updateUrl,
  createNameError,
  createNameExistsError,
  createUrlError,
  clearNameError,
  clearUrlError,
  clearAllErrors,
  clearNameExistsError,
} from '../actions';

import '../styles/form.css';
import '../styles/error.css';

import Button from './Button';

export default function AddLinkForm(props) {
  const dispatch = useDispatch();

  const siteName = useSelector((state) => state.form.fields.siteName);
  const url = useSelector((state) => state.form.fields.url);
  const errors = useSelector((state) => state.form.errors);
  const currentLinks = useSelector((state) => state.links.linksList);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (errors.length === 0) {
      dispatch(createLink({ url, siteName }));
      closeForm();
    } else {
      displayErrors();
    }
  };

  const displayErrors = () => {
    errors.forEach((err) => {
      console.error(err.type);
    });
  };

  const closeForm = () => {
    dispatch(clearAllErrors());
    dispatch(updateName(''));
    dispatch(updateUrl(''));
    props.handleCancel();
  };

  // ONCHANGE HANDLERS
  const onNameChange = (e) => {
    dispatch(updateName(e.target.value));
  };

  const onUrlChange = (e) => {
    dispatch(updateUrl(e.target.value));
  };

  // VALIDATION
  const validateSiteName = useCallback(
    (name) => {
      const linkNames = [];
      currentLinks.forEach((link) => {
        linkNames.push(link.siteName.toLowerCase());
      });
      if (!name) {
        dispatch(createNameError());
        dispatch(clearNameExistsError());
      } else if (linkNames.includes(name.toLowerCase())) {
        dispatch(createNameExistsError());
        dispatch(clearNameError());
      } else {
        dispatch(clearNameError());
        dispatch(clearNameExistsError());
      }
    },
    [dispatch, currentLinks]
  );

  const validateUrl = useCallback(
    (url) => {
      if (!url) {
        dispatch(createUrlError());
      } else dispatch(clearUrlError());
    },
    [dispatch]
  );

  useEffect(() => {
    validateSiteName(siteName);
  }, [siteName, validateSiteName]);

  useEffect(() => {
    validateUrl(url);
  }, [url, validateUrl]);

  return (
    <form className="form-addlink">
      <div className="form-addlink--content">
        <div className="form-addlink--head">
          <h1>Add New Link</h1>
        </div>

        <div className="form-addlink--fields">
          <div className="field">
            <label>Name</label>
            <input type="text" value={siteName} onChange={onNameChange} />
          </div>
          <div className="field">
            <label>URL</label>
            <input type="text" value={url} onChange={onUrlChange} />
          </div>
        </div>
        <Button
          content={'Add'}
          handleClick={handleSubmit}
          innerClass="form-addlink-add-span"
          outerClass="form-addlink-add-btn"
        />

        <Button
          handleClick={closeForm}
          content="Cancel"
          innerClass="form-addlink-cancel-span"
          outerClass="form-addlink-cancel-btn"
        />
      </div>
    </form>
  );
}
