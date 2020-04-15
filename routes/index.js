import express from 'express';
import addPlaylistRoutes from './playlist';
import addUserRoutes from './user';
import { clientId, redirectUri } from "../src/config";

const router = express.Router();

// Create node/js spotify api 
const SpotifyWebApi = require('spotify-web-api-node');
export const spotifyApi = new SpotifyWebApi({
  clientId,
  clientSecret: '3fbb80a0fa384eab8e096c6a96582cc6',
  redirectUri,
});

//Import routes from other api files (user, playlist, etc.)
addPlaylistRoutes(router);
addUserRoutes(router);

export default router;
