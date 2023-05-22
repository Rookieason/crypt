import mongoose from 'mongoose'

const Schema = mongoose.Schema;
const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    id: {
        type: String,
        required: true,
    },
    vote: {
        type: [String]
    }
});
const User = mongoose.model('User', UserSchema);
export default User;