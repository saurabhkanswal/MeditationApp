import {combineReducers} from 'redux';
import auth from './auth';
import newUser from './newUser';
import music from './music';

export default combineReducers({
  auth,
  newUser,
  music,
});
