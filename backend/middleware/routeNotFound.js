// 10.Bổ sung kết quả trả về khi sai Endpoint
// Tạo riêng 1 middleware cho việc sai địa chỉ Endpoit
const routeNotFound = (req, res) => {
  return res.status(404).json({ message: "Route Not Found" });
};

module.exports = routeNotFound;
