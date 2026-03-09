const express = require('express');
const songController = require('../controller/songController');
const upload = require('../middlewares/upload.middleware');


const songRouter = express.Router();
songRouter.post('/add-song',upload.single("song"), songController.uploadSong);

// route for fetching song according to th mood in query
songRouter.get('/fetch-song', songController.fetchSong);


module.exports = songRouter;