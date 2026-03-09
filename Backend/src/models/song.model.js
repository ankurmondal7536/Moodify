const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({

    url: {
        type: String,
        required: true
    },
    posterUrl: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    artist: {
        type: String,
    },
    album: {
        type: String,
    },
    mood: {
        type: String,
        required: true,
        enum: ["happy", "sad", "surprised", "angry", "annoyed"]
    }
})

const SongModel = mongoose.model('Songs', songSchema)

module.exports = SongModel
