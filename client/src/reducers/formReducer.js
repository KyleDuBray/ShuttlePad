import {
  UPDATE_SITENAME_FIELD,
  UPDATE_URL_FIELD,
  SITENAME_ERROR,
  SITENAME_EXISTS_ERROR,
  URL_ERROR,
  CLEAR_SITENAME_ERROR,
  CLEAR_SITENAME_EXISTS_ERROR,
  CLEAR_URL_ERROR,
  CLEAR_ALL_ERRORS,
} from '../actions/types';

const INITIAL_STATE = {
  fields: { siteName: '', url: '' },
  errors: [],
};

// ERROR TYPES (different than redux action types)
const INVALID_SITENAME = 'INVALID_SITENAME';
const SITENAME_ALREADY_EXISTS = 'SITENAME_ALREADY_EXISTS';
const INVALID_URL = 'INVALID_URL';

const formReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_SITENAME_FIELD:
      return {
        ...state,
        fields: { ...state.fields, siteName: action.payload.siteName },
      };

    case UPDATE_URL_FIELD:
      return {
        ...state,
        fields: { ...state.fields, url: action.payload.url },
      };

    case SITENAME_ERROR:
      return {
        ...state,
        errors: [
          ...state.errors,
          {
            msg: 'You must provide a valid site name',
            type: INVALID_SITENAME,
          },
        ],
      };
    case SITENAME_EXISTS_ERROR:
      return {
        ...state,
        errors: [
          ...state.errors,
          {
            msg: 'Site name already exists.',
            type: SITENAME_ALREADY_EXISTS,
          },
        ],
      };
    case URL_ERROR:
      return {
        ...state,
        errors: [
          ...state.errors,
          { msg: 'You must provide a valid url', type: INVALID_URL },
        ],
      };
    case CLEAR_SITENAME_ERROR:
      const newErrors = state.errors.filter(
        (err) => err.type !== INVALID_SITENAME
      );
      return {
        ...state,
        errors: newErrors,
      };
    case CLEAR_SITENAME_EXISTS_ERROR:
      const newError = state.errors.filter(
        (err) => err.type !== SITENAME_ALREADY_EXISTS
      );
      return {
        ...state,
        errors: newError,
      };
    case CLEAR_URL_ERROR:
      const newErrs = state.errors.filter((err) => err.type !== INVALID_URL);
      return {
        ...state,
        errors: newErrs,
      };
    case CLEAR_ALL_ERRORS:
      return {
        ...state,
        errors: [],
      };

    default:
      return state;
  }
};

export default formReducer;
