const paginate = (data, currentPage = 1, pageSize = 20) => {
  // Tổng số item
  const totalItems = data.length;

  // Tổng số trang có thể lấy
  const totalPages = Math.ceil(totalItems / pageSize);

  // Chỉ số bắt đầu và kết thúc trên trang
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

  // Lấy danh sách số lượng item trên trang hiện tại
  const results = data.slice(startIndex, endIndex + 1);

  return {
    results,
    page: currentPage,
    total_pages: totalPages,
  };
};

module.exports = paginate;
