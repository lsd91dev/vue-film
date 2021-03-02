const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: { type: String, default: null },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    created_at: { type: Date, default: new Date() },
    updated_at: { type: Date, default: new Date() }
});

UserSchema.method('toJSON', function() {
    const { password, __v, ...rest } = this.toObject();
    return rest;
})

module.exports = mongoose.model('User', UserSchema);