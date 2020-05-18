import { combineReducers } from 'redux';
import playlists from './playlists';
import user from './user';
import tracks from './tracks';
import webplayer from './webplayer';
import search from './search';
import session from './session';

export default combineReducers({
  user,
  playlists,
  tracks,
  webplayer,
  search,
  session
});
