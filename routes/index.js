import express from 'express';
import { PlaylistSession } from '../src/db/playlistSessionSchema';
import { Vote } from '../src/db/voteSchema';
import mongooseCrudify from 'mongoose-crudify';

const router = express.Router();

/**
 * This will create five API endpoints by default:
 * - Get all playlistSessions: GET /playlistSession/
 * - Create a new playlistSession: POST /playlistSession/
 * - Get a single playlistSession by id: GET /playlistSession/{id}/
 * - Update an existing playlistSession: PUT /playlistSession/{id}/
 * - Delete an existing playlistSession: DELETE /playlistSession/{id}/
 */
router.use('/playlistSession', mongooseCrudify({
    Model: PlaylistSession,
    identifyingKey: 'joinCode',
    actions: {
        //Override the "update" (PUT by identifer) action: when we update, we add or remove from the trackstobeadded field.
        update: (req, res) => {
            var dbUpdateFunction;
            //If we want to remove song
            if (req.body.trackToRemoveURI) {
                dbUpdateFunction = PlaylistSession.updateOne(
                    { joinCode: req.body.joinCode },
                    {
                        $pull: { tracksToBeAdded: { trackURI: req.body.trackToRemoveURI } }
                    }
                );
            //If we want to add song
            } else {
                //These 2 lines try to match the format of spotify songs fetched the traditional way as well as provide some identication from a normal spotify track
                req.body.trackToAdd.addedBy = req.body.addedBy;
                var track = {track: req.body.trackToAdd, trackURI: req.body.trackToAdd.uri};

                dbUpdateFunction = PlaylistSession.updateOne(
                    { joinCode: req.body.joinCode }, 
                    {
                        $push: {tracksToBeAdded: track}
                    }
                );
            }
            dbUpdateFunction.then(
                function(data) {
                    res.json(data);
                },
                function(err) {
                    console.log('Something went wrong! (add/remove track to/from DB)', err);
                    res.status(err.statusCode).end();
                }
            );
        }        
    }
}));

/**
 * This will create five API endpoints by default:
 * - Get all votes: GET /vote/
 * - Create a new vote: POST /vote/
 * - Get a single vote by id: GET /vote/{id}/
 * - Update an existing vote: PUT /vote/{id}/
 * - Delete an existing vote: DELETE /vote/{id}/
 */
router.use('/vote', mongooseCrudify({
    Model: Vote
}));

export default router;