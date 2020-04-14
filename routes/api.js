import { clientId, redirectUri, scopes } from "../src/config";

const SpotifyWebApi = require('spotify-web-api-node');

// Create spotify api
const spotifyApi = new SpotifyWebApi({
  clientId,
  clientSecret: '3fbb80a0fa384eab8e096c6a96582cc6',
  redirectUri,
});

export default router => {

    router.get("/me", (req, res) => {
        spotifyApi.getMe()
        .then(function(data) {
            res.json(data);
        }, function(err) {
            console.log('Something went wrong! (me)', err);
            res.status(err.statusCode).end();
        });
    });

    router.post("/getUserPlaylists", (req, res) => {
        spotifyApi.getUserPlaylists(req.body.userId, { limit : 10 })
        .then(function(data) {
            res.json(data);
        }, function(err) {
            console.log('Something went wrong! (get playlists)', err);
            res.status(err.statusCode).end();
        });
    });

    router.get("/getLoginURL", (req, res) => {
        var URL = spotifyApi.createAuthorizeURL(scopes);// + "&show_dialog=true";
        res.send(URL);
        //res.json({ URL: spotifyApi.createAuthorizeURL(scopes) + "&show_dialog=true"});
    });

    router.post("/login", (req, res) => {
        spotifyApi.authorizationCodeGrant(req.body.code).then(
            function(data) {
                console.log("Successfully retrieved tokens!");
                //console.log('The token expires in ' + data.body['expires_in']);
                //console.log('The access token is ' + data.body['access_token']);
                //console.log('The refresh token is ' + data.body['refresh_token']);
    
                // Set the access token on the API object to use it in later calls
                spotifyApi.setAccessToken(data.body['access_token']);
                spotifyApi.setRefreshToken(data.body['refresh_token']);
                res.json(data);
            },
            function(err) {
                console.log('Something went wrong! (login)', err);
                console.log(err);
                res.status(err.statusCode).end();
            });
    });

    router.post("/createPlaylist", (req, res) => {
        spotifyApi.createPlaylist(req.body.userId, req.body.name, { public : false }).then(
            function(data) {
                res.json(data);
            },
            function(err) {
                console.log('Something went wrong! (create playlist)', err);
                res.status(err.statusCode).end();
        });
    });
}

