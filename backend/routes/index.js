const express = require("express");
const movieRoute = require("./movie.js");
// 10.Bổ sung kết quả trả về khi sai Endpoint
const routeNotFound = require("../middleware/routeNotFound.js");

const router = express.Router();

router.use(movieRoute);

// Tất cả các endpoint khác sẽ dẫn tới middleware này
router.use(routeNotFound);

module.exports = router;
