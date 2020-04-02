import { v4 as uuid } from 'uuid';
import { clientId, redirectUri, scopes } from "../src/config";

var SpotifyWebApi = require('spotify-web-api-node');

//Create spotify api
var spotifyApi = new SpotifyWebApi({
  clientId: clientId,
  clientSecret: '3fbb80a0fa384eab8e096c6a96582cc6',
  redirectUri: redirectUri
});

export default router => {

    router.get("/me", (req, res) => {
        spotifyApi.getMe()
        .then(function(data) {
            console.log('Some information about the authenticated user', data.body);
            res.json(data);
        }, function(err) {
            console.log('Something went wrong! (me)', err);
            res.status(400).end();
        });
    });

    router.get("/getLoginURL", (req, res) => {
        var URL = spotifyApi.createAuthorizeURL(scopes);// + "&show_dialog=true";
        res.send(URL);
        //res.json({ URL: spotifyApi.createAuthorizeURL(scopes) + "&show_dialog=true"});
    })

    router.post("/login", (req, res) => {
        spotifyApi.authorizationCodeGrant(req.body.code).then(
            function(data) {
                console.log("Successfully retrieved tokens!");
                console.log('The token expires in ' + data.body['expires_in']);
                console.log('The access token is ' + data.body['access_token']);
                console.log('The refresh token is ' + data.body['refresh_token']);
    
                // Set the access token on the API object to use it in later calls
                spotifyApi.setAccessToken(data.body['access_token']);
                spotifyApi.setRefreshToken(data.body['refresh_token']);
                res.json(data);
            },
            function(err) {
                console.log('Something went wrong! (login)', err);
                res.status(401).end();
            });
    });


}