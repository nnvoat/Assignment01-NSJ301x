const fs = require("fs");
const path = require("path");

// 3. Đọc dữ liệu từ file
// Đường dẫn đến movieList.json
const movieListPath = path.join(__dirname, "../data/movieList.json");
// Đường dẫn đến genreList.json
const genreListPath = path.join(__dirname, "../data/genreList.json");
// Đường dẫn đến videoList.json
const videoListPath = path.join(__dirname, "../data/videoList.json");
// Đường dẫn đến userToken.json
const userTokenPath = path.join(__dirname, "../data/userToken.json");

const Movies = {
  all: function () {
    try {
      const data = fs.readFileSync(movieListPath, "utf8");
      return JSON.parse(data);
    } catch (error) {
      console.log("Error redding movie list:", error);
      return [];
    }
  },

  genre: function () {
    try {
      const data = fs.readFileSync(genreListPath, "utf8");
      return JSON.parse(data);
    } catch (error) {
      console.log("Error reading Gerne List:", error);
      return [];
    }
  },

  video: function () {
    try {
      const data = fs.readFileSync(videoListPath, "utf8");
      return JSON.parse(data);
    } catch (error) {
      console.log("Error reading Video List:", error);
      return [];
    }
  },

  userToken: function () {
    try {
      const data = fs.readFileSync(userTokenPath, "utf8");
      return JSON.parse(data);
    } catch (error) {
      console.log("Error reading User Token:", error);
      return [];
    }
  },
};

module.exports = Movies;
