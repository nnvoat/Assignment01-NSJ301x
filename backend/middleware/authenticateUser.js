// 9. Thêm cơ chế xác thực
// Tạo riêng 1 middleware cho việc này
const Movies = require("../models/Movies.js");

const authenticateUser = (req, res, next) => {
  // Khai báo biến token
  const token = req.body.authorization;

  // Nếu không có token thì sẽ báo lỗi
  if (!token) {
    return res.status(401).json({ message: '"Unauthorized"' });
  }

  try {
    // Lấy dữ liệu token người dùng
    const userToken = Movies.userToken();
    // Kiểm tra người dùng
    const user = userToken.find((user) => user.token === token);
    // Nếu không có thì báo lỗi
    if (!user) {
      return res.status(401).json({ message: '"Unauthorized"' });
    }

    // Đính kèm user này để sử dụng
    req.user = user;

    // Dùng hàm next
    next();
  } catch (error) {
    console.log("Error reading movie list:", error);
    return res.status(500).json({ error: "Server error" });
  }
};

module.exports = authenticateUser;
