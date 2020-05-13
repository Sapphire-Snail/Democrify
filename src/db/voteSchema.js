import mongoose from 'mongoose';

const Schema = mongoose.Schema;

// Generate the schema for your data.
// See: https://mongoosejs.com/docs/guide.html
// timestamps
// With ES6 classes!!!
// Note how we don't need an ID - that's generated for us.
// We also don't need to manually do created / updated timestamps if we need them.

const voteSchema = new Schema({
    userID: { type: String },
    trackURI: [{ type: String }],
    hostID: { type: String }
}, { /* This second object allows us to specify more config info. In this case, we're enabling automatic timetamps using the default options.
        For more options, see the URL above. */
    timestamps: {}
});

export const Vote = mongoose.model('Vote', voteSchema);