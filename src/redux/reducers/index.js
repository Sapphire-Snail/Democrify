import { combineReducers } from 'redux';
import playlists from './playlists';
import user from './user';
import tracks from './tracks';

export default combineReducers({
  user,
  playlists,
  tracks,
});
