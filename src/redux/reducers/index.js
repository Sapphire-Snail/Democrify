import { combineReducers } from 'redux';
import playlists from './playlists';
import user from './user';

export default combineReducers({
  user,
  playlists,
});
