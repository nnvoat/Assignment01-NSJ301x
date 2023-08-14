// Data phim đã được chuyển thành định dạng json
const Movies = require("../models/Movies.js");
// Function phân trang
const paginate = require("../utils/paging.js");

// 4. Lấy các phim đang trending
// [GET] /api/movies/trending
const getMovieTrending = (req, res) => {
  try {
    // Danh sách phim
    const moviesData = Movies.all();

    // Lấy giá trị trang hiện tại
    const currentPage = parseInt(req.query.page) || 1;
    // Số lượng phim trên 1 trang là 20
    const pageSize = 20;
    // Tổng số trang có thể lấy
    const totalPages = Math.ceil(moviesData.length / pageSize);
    // Chỉ số bắt đầu và kết thúc cho trang hiện tại
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    // Danh sách phim hiển thị trên trang hiện tại
    const results = moviesData.slice(startIndex, endIndex);

    // Gửi response và thông tin trang (status code 200)
    return res.status(200).json({
      results,
      page: currentPage,
      total_pages: totalPages,
    });
  } catch (error) {
    console.log("Error reading movie list:", error);
    return res.status(500).json({ error: "Server error" });
  }
};

// 5. Lấy các phim có Rating cao
// [GET] /api/movies/top-rate
const getMovieTopRate = (req, res) => {
  try {
    // Danh sách phim
    const moviesData = Movies.all();

    // Lấy giá trị trang hiện tại
    const currentPage = parseInt(req.query.page) || 1;
    // Số lượng phim trên 1 trang là 20
    const pageSize = 20;
    // Tổng số trang có thể lấy
    const totalPages = Math.ceil(moviesData.length / pageSize);
    // Chỉ số bắt đầu và kết thúc trên trang hiện tại
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    // Sắp xếp danh sách phim có Rating cao theo vote_average
    const sortedMovies = moviesData.sort(
      (a, b) => b.vote_average - a.vote_average
    );

    // Danh sách phim cho trang hiện tại
    const results = sortedMovies.slice(startIndex, endIndex);

    // Gửi response và thông tin trang (status code 200)
    return res.status(200).json({
      results,
      page: currentPage,
      total_pages: totalPages,
    });
  } catch (error) {
    console.log("Error reading movie list:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// 6. Lấy các phim theo thể loại
// [GET] /api/movies/discover?genre=28
const getMoviesByGenre = (req, res) => {
  try {
    // Danh sách phim
    const moviesData = Movies.all();
    // Danh sách thể loại
    const genresData = Movies.genre();

    // Lấy giá trị của tham số query parameters trên url
    const genreId = parseInt(req.query.genre);
    // Khi người dùng không truyền vào param thì sẽ báo lỗi
    if (!genreId) {
      return res.status(400).json({ message: "Not found gerne parram" });
    }
    // Khi người dùng truyền vào param mà không có trong danh sách id thì báo lỗi
    const genre = genresData.find((item) => item.id === genreId);
    if (!genre) {
      return res.status(404).json({ message: "Not found that gerne id" });
    }

    // Lấy giá trị của trang hiện tại
    const currentPage = parseInt(req.query.page) || 1;
    // Số lượng phim hiển thị trên 1 trang là 20
    const pageSize = 20;
    // Tổng số trang có thể lấy
    const totalPages = Math.ceil(moviesData.length / pageSize);
    // Chỉ số trang bắt đầu và kết thúc trên trang hiện tại
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    // Lọc danh sách phim theo thể loại đã truyền vào
    const moviesByGenre = moviesData.filter((movie) =>
      movie.genre_ids.includes(genreId)
    );

    // Danh sách phim hiển thị trên trang hiện tại
    const results = moviesByGenre.slice(startIndex, endIndex);

    // Gửi response và thông tin trang
    return res.status(200).json({
      results,
      page: currentPage,
      total_pages: totalPages,
      genre_name: genre.name,
    });
  } catch (error) {
    console.log("Error reading movie list:", error);
    return res.status(500).json({ error: "Server error" });
  }
};

// 7. Lấy Trailer của một bộ phim
// [POST] /api/movies/video
const postMovieVideo = (req, res) => {
  try {
    // Danh sách video
    const videosData = Movies.video();

    // Lấy giá trị phim nhập từ request body
    const filmId = req.body.film_id;

    // Kiểm tra xem người dùng đã nhập giá trị vào hay chưa
    if (!filmId) {
      return res.status(400).json({ message: "Not found film_id param" });
    }

    // Tìm danh sách video phù hợp với giá trị đã nhập
    const videosForMovie = videosData.find((video) => video.id === filmId);
    // Nếu không tìm được video đã nhập thì thông báo lỗi
    if (
      !videosForMovie ||
      !videosForMovie.videos ||
      !videosForMovie.videos.length === 0
    ) {
      return res.status(404).json({ message: "Not found video" });
    }

    // Lọc phim theo yêu cầu
    const filteredVideos = videosForMovie.videos.filter((video) => {
      return (
        video.official === true &&
        video.site === "YouTube" &&
        (video.type === "Trailer" || video.type === "Teaser")
      );
    });

    // Sắp xếp video tìm được theo published_at gần nhất
    filteredVideos.sort(
      (a, b) => new Date(b.published_at) - new Date(a.published_at)
    );

    // Nếu không có video thì báo lỗi
    if (filteredVideos.length === 0) {
      return res.status(404).json({ message: "Not found video" });
    }

    // Lấy 1 video trailer
    const lastestVideo = filteredVideos[0];
    return res.status(200).json(lastestVideo);
  } catch (error) {
    console.log("Error reading movie list:", error);
    return res.status(500).json({ error: "Server error" });
  }
};

// 8. Tìm kiếm theo từ khoá
// [POST] /api/movies/search
const postMovieSearch = (req, res) => {
  try {
    // Danh sách phim
    const moviesData = Movies.all();

    // Lấy query từ query parameter của yêu cầu GET
    const query = req.body.query;

    // Chuyển kiểu dạng chữ sang chữ thường để không phân biệt chữ hoa và chữ thường
    const queryToLowerCase = query.toLowerCase();

    // Tìm các phim có chứa query nằm trong title hoặc overview
    const matchedMovies = moviesData.filter((movie) => {
      const titleToLowerCase = (movie.title || "").toLowerCase();
      const overviewToLowerCase = (movie.overview || "").toLowerCase();
      return (
        titleToLowerCase.includes(queryToLowerCase) ||
        overviewToLowerCase.includes(queryToLowerCase)
      );
    });

    // Lấy giá trị của trang hiện tại từ query parameter
    const currentPage = parseInt(req.query.page) || 1;
    // Số lượng phim trên một trang là 20
    const pageSize = 20;

    // Sử dụng paginate để phân trang
    const paginatedResults = paginate(matchedMovies, currentPage, pageSize);

    // Gửi response và thông tin trang
    return res.status(200).json(paginatedResults);
  } catch (error) {
    console.log("Error reading movie list:", error);
    return res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  getMovieTrending,
  getMovieTopRate,
  getMoviesByGenre,
  postMovieVideo,
  postMovieSearch,
};
