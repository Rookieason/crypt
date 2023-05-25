import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const VoteSchema = new Schema({
    name: {
        type: String
    },
    q: {
        type: Number,
        required: true,
    },
    g: {
        type: Number,
        required: true,
    },
    h: {
        type: Number, 
        required: true,
    },
    c1: {
        type: Number
    },
    c2: {
        type: Number
    },
    date: {
        type: String
    }
});

const Vote = mongoose.model('Vote', VoteSchema);
export default Vote;