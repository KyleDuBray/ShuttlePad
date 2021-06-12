import { combineReducers } from 'redux';
import linksReducer from './linksReducer';
import formReducer from './formReducer';
import weatherReducer from './weatherReducer';

export default combineReducers({
  links: linksReducer,
  form: formReducer,
  weather: weatherReducer
});
