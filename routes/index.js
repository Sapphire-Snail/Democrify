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
        // Override the "update" (PUT by identifer) action: when we update we add to the trackstobeaddedfield.
        update: (req, res) => { 
            console.log(req);
            console.log(res);
            PlaylistSession.update(
                { joinCode: req.joinCode }, 
                {
                    $push: {
                        tracksToAdd: req.trackToAdd
                    }
                }
            )
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