import React, { useState, useEffect, useCallback, useRef } from 'react';
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

// ERROR TYPES (different than redux action types)
const INVALID_SITENAME = 'INVALID_SITENAME';
const SITENAME_ALREADY_EXISTS = 'SITENAME_ALREADY_EXISTS';
const INVALID_URL = 'INVALID_URL';

export default function AddLinkForm(props) {
  const dispatch = useDispatch();

  // For focus on load
  const siteNameInputRef = useRef(null);

  // From Redux state
  const siteName = useSelector((state) => state.form.fields.siteName);
  const url = useSelector((state) => state.form.fields.url);
  const errors = useSelector((state) => state.form.errors);
  const currentLinks = useSelector((state) => state.links.linksList);

  // Display error flag (used by onBlur)
  const [displaySiteNameErrorFlag, setDisplaySiteNameErrorFlag] =
    useState(false);
  const [displayUrlErrorFlag, setDisplayUrlErrorFlag] = useState(false);

  // To show error style on input
  const [showSiteNameError, setShowSiteNameError] = useState(false);

  const [showUrlError, setShowUrlError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (errors.length === 0) {
      dispatch(createLink({ url, siteName }));
      closeForm();
    }
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
        setShowSiteNameError(true);
      } else if (linkNames.includes(name.toLowerCase())) {
        dispatch(createNameExistsError());
        dispatch(clearNameError());
        setShowSiteNameError(true);
      } else {
        dispatch(clearNameError());
        dispatch(clearNameExistsError());
        setShowSiteNameError(false);
      }
    },
    [dispatch, currentLinks]
  );

  const validateUrl = useCallback(
    (url) => {
      if (!url || !url.startsWith('http')) {
        dispatch(clearUrlError());
        dispatch(createUrlError());
        setShowUrlError(true);
      } else {
        dispatch(clearUrlError());
        setShowUrlError(false);
      }
    },
    [dispatch]
  );

  // focus on initial load up
  useEffect(() => {
    siteNameInputRef?.current.focus();
  }, []);

  //Validate fields on change
  useEffect(() => {
    validateSiteName(siteName);
  }, [siteName, validateSiteName]);

  useEffect(() => {
    validateUrl(url);
  }, [url, validateUrl]);

  // If input touched and has errors, show them
  const renderErrors = () => {
    return errors.map((err, index) => {
      if (displaySiteNameErrorFlag) {
        if (err.type === INVALID_SITENAME) {
          return <p key={index}>Please give a valid site name.</p>;
        }

        if (err.type === SITENAME_ALREADY_EXISTS) {
          return (
            <p key={index}>
              This site name already exists in your links. Please give another
              name.
            </p>
          );
        }
      }
      if (displayUrlErrorFlag) {
        if (err.type === INVALID_URL) {
          return <p key={index}>Please give a valid URL.</p>;
        }
      }
    });
  };

  return (
    <form className="form-addlink">
      <div className="form-addlink--content">
        <div className="form-addlink--head">
          <h1>Add New Link</h1>
        </div>

        <div className="form-addlink--fields">
          <div className="field">
            <label>Name</label>
            <input
              className={showSiteNameError ? 'error' : ''}
              ref={siteNameInputRef}
              type="text"
              value={siteName}
              onChange={onNameChange}
              onBlur={() => setDisplaySiteNameErrorFlag(true)}
            />
          </div>
          <div className="field">
            <label>URL</label>
            <input
              className={showUrlError ? 'error' : ''}
              type="text"
              value={url}
              onChange={onUrlChange}
              onBlur={() => setDisplayUrlErrorFlag(true)}
            />
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

        <div className="error-container">{renderErrors()}</div>
      </div>
    </form>
  );
}
