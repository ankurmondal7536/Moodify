const nodeid3 = require('node-id3'); // for reading tags from songs
const songModel = require("../models/song.model")
const storageService = require('../services/storage.service');

async function uploadSong(req, res) {
    // console.log("req.file", req.file)
    const { mood } = req.body
    // console.log("mood",mood)
    const songBuffer = req.file.buffer // getting the song buffer
    const tags = nodeid3.read(songBuffer) // reading the tags from the song
    // console.log("tags", tags)

    // 1. Dono uploads parallel shuru honge
    const [songFile, posterFile] = await Promise.all([
        storageService.uploadFile({
            buffer: songBuffer,
            filename: tags.title + ".mp3",
            artist: tags.artist,
            album: tags.album,
            folder: "/moodify/songs"
        }),
        storageService.uploadFile({
            buffer: tags.image.imageBuffer,
            filename: tags.title + ".jpg",
            folder: "/moodify/posters"
        })
    ]);

    // 2. Jab dono files cloud par chali jayein, tab Database mein entry hogi
    const song = await songModel.create({
        url: songFile.url,
        posterUrl: posterFile.url,
        title: tags.title,
        artist: tags.artist,
        mood: mood
    });

    // 3. Song uploaded Successfully
    res.status(201).json({
        message: "Song Uploaded Successfully",
        song
    });


}

async function fetchSong(req, res) {
    const { mood } = req.query
    const song = await songModel.find({
        mood
    })
    res.status(200).json({
        message: "Song Fetched Successfully",
        song
    });
}
module.exports = {
    uploadSong,
    fetchSong
}