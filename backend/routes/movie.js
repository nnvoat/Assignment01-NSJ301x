const express = require("express");
const movieController = require("../controllers/movie.controller.js");
// middleware token
// const authenticateUser = require("../middleware/authenticateUser.js");

const router = express.Router();

router.get("/trending", movieController.getMovieTrending);

router.get("/top-rate", movieController.getMovieTopRate);

router.get("/discover", movieController.getMoviesByGenre);

router.post("/video", movieController.postMovieVideo);

router.post("/search", movieController.postMovieSearch);

module.exports = router;
