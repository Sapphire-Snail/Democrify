import rootReducer from '../redux/reducers';
import { createStore } from 'redux';
import { loadPlaylistsLoading, loadPlaylistsSuccess, loadPlaylistsError, createPlaylistLoading, createPlaylistSuccess, createPlaylistError, setActivePlaylist, getPlaylistLoading, getPlaylistSuccess, getPlaylistError, setCollaborativeLoading, setCollaborativeSuccess, setCollaborativeError } from '../redux/actions/playlists';
import { getUserLoading, getUserSuccess, getUserError, setLoggedIn, setLoggedOut } from '../redux/actions/user';
import { setDeviceId, setPlayState } from '../redux/actions/webplayer';
import { searchLoading, searchSuccess, searchError, addSongError, addSongLoading, addSongSuccess, removeSongError, removeSongSuccess, removeSongLoading } from '../redux/actions/search';
import { createSessionLoading, createSessionSuccess, createSessionError, getSessionLoading, getSessionSuccess, getSessionError } from '../redux/actions/session';
import { getPlaylistTracksLoading, getPlaylistTracksSuccess, getPlaylistTracksError } from '../redux/actions/tracks';

let store;

/**
 * Re-initialize the store to default before each test.
 */
beforeEach(() => {
    store = createStore(rootReducer);
})

/**
 * Tests that the store's initial state contains 6 empty arrays with correct names
 */
it('check the initial store state', () => {
    const keys = Object.keys(store.getState());
    expect(keys.length).toBe(6);
    expect(keys[0]).toBe('user');
    expect(keys[1]).toBe('playlists');
    expect(keys[2]).toBe('tracks');
    expect(keys[3]).toBe('webplayer');
    expect(keys[4]).toBe('search');
    expect(keys[5]).toBe('session');
    expect(store.getState().user).toStrictEqual([]);
    expect(store.getState().playlists).toStrictEqual([]);
    expect(store.getState().tracks).toStrictEqual([]);
    expect(store.getState().webplayer).toStrictEqual([]);
    expect(store.getState().search).toStrictEqual([]);
    expect(store.getState().session).toStrictEqual([]);
});

/**
 * USER REDUCER TESTS
 */

it('get user loading works', () => {
    store.dispatch(getUserLoading());
    expect(store.getState().user.loading).toBe(true);
    expect(store.getState().user.error).toBe(null);
})

it('get user success works', () => {
    store.dispatch(getUserSuccess({"username":"vinnyt123"}));
    expect(store.getState().user.loading).toBe(false);
    expect(store.getState().user.data).toStrictEqual({"username":"vinnyt123"});
})

it('get user error works', () => {
    store.dispatch(getUserError({"errorCode":"401"}));
    expect(store.getState().user.loading).toBe(false);
    expect(store.getState().user.error).toStrictEqual({"errorCode":"401"});
})

it('set user logged in works', () => {
    store.dispatch(setLoggedIn("asdhjb3223ij"));
    expect(store.getState().user.error).toBe(null);
    expect(store.getState().user.loggedIn).toBe(true);
    expect(store.getState().user.accessToken).toStrictEqual("asdhjb3223ij");
})

it('set user logged out works', () => {
    store.dispatch(setLoggedOut());
    expect(store.getState().user.error).toBe(null);
    expect(store.getState().user.loggedIn).toBe(false);
    expect(store.getState().user.accessToken).toStrictEqual(null);
})

/**
 * PLAYLISTS REDUCER TESTS
 */

it('load playlists loading works', () => {
    store.dispatch(loadPlaylistsLoading());
    expect(store.getState().playlists.loading).toBe(true);
    expect(store.getState().playlists.error).toBe(null);
})

it('load playlists success works', () => {
    store.dispatch(loadPlaylistsSuccess({"items": ["Cool Songs", "The best songs"]}));
    expect(store.getState().playlists.loading).toBe(false);
    expect(store.getState().playlists.data).toStrictEqual({"items": ["Cool Songs", "The best songs"]});
})

it('load playlists error works', () => {
    store.dispatch(loadPlaylistsError({"errorCode":"401"}));
    expect(store.getState().playlists.loading).toBe(false);
    expect(store.getState().playlists.error).toStrictEqual({"errorCode":"401"});
})

it('create playlist loading works', () => {
    store.dispatch(createPlaylistLoading());
    expect(store.getState().playlists.loading).toBe(true);
    expect(store.getState().playlists.error).toBe(null);
})

it('create playlist success works', () => {
    store.dispatch(loadPlaylistsSuccess({"items": ["Cool Songs", "The best songs"]}));
    store.dispatch(createPlaylistSuccess("My fav songs"));
    expect(store.getState().playlists.loading).toBe(false);
    expect(store.getState().playlists.error).toBe(null);
    expect(store.getState().playlists.data).toStrictEqual({"items": ["My fav songs", "Cool Songs", "The best songs"]});
})

it('create playlist error works', () => {
    store.dispatch(createPlaylistError({"errorCode":"400"}));
    expect(store.getState().playlists.loading).toBe(false);
    expect(store.getState().playlists.error).toStrictEqual({"errorCode":"400"});
})

it('set active playlist works', () => {
    store.dispatch(setActivePlaylist("the songs of the year"));
    expect(store.getState().playlists.active_playlist).toBe("the songs of the year");
})

it('get playlist loading works', () => {
    store.dispatch(getPlaylistLoading());
    expect(store.getState().playlists.loading).toBe(true);
    expect(store.getState().playlists.error).toBe(null);
})

it('get playlist success works', () => {
    store.dispatch(getPlaylistSuccess("Top 100 songs"));
    expect(store.getState().playlists.loading).toBe(false);
    expect(store.getState().playlists.error).toBe(null);
    expect(store.getState().playlists.active_playlist).toBe("Top 100 songs");
})

it('get playlist error works', () => {
    store.dispatch(getPlaylistError({"errorCode":"400"}));
    expect(store.getState().playlists.loading).toBe(false);
    expect(store.getState().playlists.error).toStrictEqual({"errorCode":"400"});
})

it('set collaborative loading works', () => {
    store.dispatch(setCollaborativeLoading());
    expect(store.getState().playlists.loading).toBe(true);
    expect(store.getState().playlists.error).toBe(null);
})

it('set collaborative success works', () => {
    store.dispatch(setCollaborativeSuccess());
    expect(store.getState().playlists.loading).toBe(false);
    expect(store.getState().playlists.error).toBe(null);
})

it('set collaborative error works', () => {
    store.dispatch(setCollaborativeError({"errorCode":"400"}));
    expect(store.getState().playlists.loading).toBe(false);
    expect(store.getState().playlists.error).toStrictEqual({"errorCode":"400"});
})

/**
 * WEBPLAYER REDUCER TESTS
 */

it('set webplayer device ID works', () => {
    store.dispatch(setDeviceId("odsfnwedwed"));
    expect(store.getState().webplayer.deviceId).toBe("odsfnwedwed");
})

it('set webplayer play state works', () => {
    store.dispatch(setPlayState("PLAYING"));
    expect(store.getState().webplayer.playState).toBe("PLAYING");
})

/**
 * SEARCH REDUCER TESTS
 */

it('search loading works', () => {
    store.dispatch(searchLoading());
    expect(store.getState().search.loading).toBe(true);
    expect(store.getState().search.error).toBe(null);
})

it('search success works', () => {
    store.dispatch(searchSuccess("one dance"));
    expect(store.getState().search.loading).toBe(false);
    expect(store.getState().search.data).toBe("one dance");
})

it('search error works', () => {
    store.dispatch(searchError({"errorCode":"400"}));
    expect(store.getState().search.loading).toBe(false);
    expect(store.getState().search.error).toStrictEqual({"errorCode":"400"});
})

it('add song loading works', () => {
    store.dispatch(addSongLoading());
    expect(store.getState().search.addSongLoading).toBe(true);
    expect(store.getState().search.error).toBe(null);
})

it('add song success works', () => {
    store.dispatch(addSongSuccess());
    expect(store.getState().search.addSongLoading).toBe(false);
})

it('add song error works', () => {
    store.dispatch(addSongError({"errorCode":"400"}));
    expect(store.getState().search.addSongLoading).toBe(false);
    expect(store.getState().search.error).toStrictEqual({"errorCode":"400"});
})

it('remove song loading works', () => {
    store.dispatch(removeSongLoading());
    expect(store.getState().search.removeSongLoading).toBe(true);
    expect(store.getState().search.error).toBe(null);
})

it('remove song success works', () => {
    store.dispatch(removeSongSuccess());
    expect(store.getState().search.removeSongLoading).toBe(false);
})

it('remove song error works', () => {
    store.dispatch(removeSongError({"errorCode":"400"}));
    expect(store.getState().search.removeSongLoading).toBe(false);
    expect(store.getState().search.error).toStrictEqual({"errorCode":"400"});
})

/**
 * SESSION REDUCER TESTS
 */

it('create session loading works', () => {
    store.dispatch(createSessionLoading());
    expect(store.getState().session.loading).toBe(true);
    expect(store.getState().session.error).toBe(null);
})

it('create session success works', () => {
    store.dispatch(createSessionSuccess({"code":"abcs"}));
    expect(store.getState().session.loading).toBe(false);
    expect(store.getState().session.hosted_session).toStrictEqual({"code":"abcs"});
})

it('create session error works', () => {
    store.dispatch(createSessionError({"errorCode":"400"}));
    expect(store.getState().session.loading).toBe(false);
    expect(store.getState().session.error).toStrictEqual({"errorCode":"400"});
})

it('get session loading works', () => {
    store.dispatch(getSessionLoading());
    expect(store.getState().session.loading).toBe(true);
    expect(store.getState().session.error).toBe(null);
})

it('get session success works', () => {
    store.dispatch(getSessionSuccess({"code":"abcs"}));
    expect(store.getState().session.loading).toBe(false);
    expect(store.getState().session.error).toBe(null);
    expect(store.getState().session.connected_session).toStrictEqual({"code":"abcs"});
})

it('get session error works', () => {
    store.dispatch(getSessionError({"errorCode":"400"}));
    expect(store.getState().session.loading).toBe(false);
    expect(store.getState().session.error).toStrictEqual({"errorCode":"400"});
})

 /**
 * TRACKS REDUCER TESTS
 */

it('get playlist tracks loading works', () => {
    store.dispatch(getPlaylistTracksLoading());
    expect(store.getState().tracks.loading).toBe(true);
    expect(store.getState().tracks.error).toBe(null);
})

it('get playlist tracks success works', () => {
    store.dispatch(getPlaylistTracksSuccess({"tracks":["best girl","song1"]}));
    expect(store.getState().tracks.loading).toBe(false);
    expect(store.getState().tracks.data).toStrictEqual({"tracks":["best girl","song1"]});
})

it('get playlist tracks error works', () => {
    store.dispatch(getPlaylistTracksError({"errorCode":"400"}));
    expect(store.getState().tracks.loading).toBe(false);
    expect(store.getState().tracks.error).toStrictEqual({"errorCode":"400"});
})