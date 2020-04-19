import { combineReducers } from 'redux';
import playlists from './playlists';
import user from './user';
import tracks from './tracks';
import webplayer from './webplayer';

export default combineReducers({
  user,
  playlists,
  tracks,
  webplayer,
});
