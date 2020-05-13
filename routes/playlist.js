import { spotifyApi } from './oldIndex';

export default router => {
    router.post("/getUserPlaylists", (req, res) => {
        spotifyApi.getUserPlaylists(req.body.userId, { limit : 10 })
        .then(function(data) {
            res.json(data);
        }, function(err) {
            console.log('Something went wrong! (get playlists)', err);
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

