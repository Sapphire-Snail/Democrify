import Spotify from "spotify-web-api-js";
import { scopes, redirectUri, clientId } from '../src/config';

const spotifyApi = new Spotify();

export function getSpotifyLoginURL() {
    return (
		"https://accounts.spotify.com/authorize?client_id=" +
		clientId +
		"&redirect_uri=" +
		redirectUri +
		"&scope=" +
		scopes.join(" ") +
		"&response_type=token"
	);
}

export function checkUrlForAccessToken() {
	const params = getHashParams();
	const accessToken = params.access_token;
	if (!accessToken) {
		return false;
	} else {
		return accessToken;
	}
}

//Code taken from https://github.com/cosmicjs/react-spotify-blog/blob/master/src/spotifyFunctions.js
function getHashParams() {
	//helper function to parse the query string that spotify sends back when you log in
	var hashParams = {};
	var e,
		r = /([^&;=]+)=?([^&;]*)/g,
		q = window.location.hash.substring(1);
	// eslint-disable-next-line
	while ((e = r.exec(q))) {
		hashParams[e[1]] = decodeURIComponent(e[2]);
	}
	return hashParams;
}

export function setAccessToken(accessToken) {
    //Setting this for use by spotify api later
    console.log('Successfuly set access token');
    spotifyApi.setAccessToken(accessToken);
}

export function getUserInfo() {
	return spotifyApi.getMe();
}

//If no user id is supplied, it uses the id of the user who authenticated
export function getUserPlaylists() {
    return spotifyApi.getUserPlaylists();
}

export function createPlaylist(userId, playlistName) {
    return spotifyApi.createPlaylist(userId, {name: playlistName});
}

export function getPlaylistTracks(playlistId) {
	return spotifyApi.getPlaylistTracks(playlistId);
}

export function play(contextURI, deviceId, startUri) {
	if(contextURI == null || startUri == null) {
		return spotifyApi.play({device_id: deviceId});
	}
	return spotifyApi.play({context_uri: contextURI, device_id: deviceId, offset: {uri: startUri}});
}

export function pause(deviceId) {
	return spotifyApi.pause({device_id: deviceId});
}

export function searchSong(keyword) {
	return spotifyApi.searchTracks(keyword);
}

export function addSong(activePlaylistID, songURI) {
	return spotifyApi.addTracksToPlaylist(activePlaylistID, [songURI]);
}

export function removeSong(activePlaylistID, songURI){
	return spotifyApi.removeTracksFromPlaylist(activePlaylistID, [songURI]);
}
export function skipToNext(deviceId) {
	return spotifyApi.skipToNext({device_id: deviceId});
}

export function getPlaylist(playlist_id) {
	return spotifyApi.getPlaylist(playlist_id);
}