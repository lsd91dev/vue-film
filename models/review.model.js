const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
    user_id: { type: String, required: true },
    movie_id: { type: String, required: true },
    content: { type: String, required: true },
    created_at: { type: Date, default: new Date() },
    updated_at: { type: Date, default: new Date() },
    movie_title: { type: String, default: null },
    username: { type: String, required: true },
});

module.exports = mongoose.model('Review', ReviewSchema);