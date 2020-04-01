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

    router.get("/greeting", (req, res) => {

        res.json({ message: `Hello, world! Unique ID: ${uuid()}` });

    });

    router.get("/login", (req, res) => {
        var authorizeURL = spotifyApi.createAuthorizeURL(scopes);
        res.send(authorizeURL);
    });

    router.post("/getLoginCode", (req, res) => {
        console.log("QS IS: " + req.queryString);
        const queryString = req.queryString;
        const urlParams = new URLSearchParams(queryString);
        const code = urlParams.get('code');
        // Retrieve an access token and a refresh token
        console.log('CODE IS: ' + code);
        spotifyApi.authorizationCodeGrant(code).then(
        function(data) {
            console.log('The token expires in ' + data.body['expires_in']);
            console.log('The access token is ' + data.body['access_token']);
            console.log('The refresh token is ' + data.body['refresh_token']);

            // Set the access token on the API object to use it in later calls
            spotifyApi.setAccessToken(data.body['access_token']);
            spotifyApi.setRefreshToken(data.body['refresh_token']);
        },
        function(err) {
            console.log('Something went wrong!', err);
        }
        ); 
    });
}