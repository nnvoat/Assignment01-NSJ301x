const requests = {
  fetchTrending: `/trending?language=en-US`,
  fetchNetflixOriginals: `/discover?genre=99&language=en-US`,
  fetchTopRated: `/top-rate?page=1&language=en-US`,
  fetchActionMovies: `/discover?genre=28&language=en-US`,
  fetchComedyMovies: `/discover?genre=35&language=en-US`,
  fetchHorrorMovies: `/discover?genre=27&language=en-US`,
  fetchRomanceMovies: `/discover?genre=10749&language=en-US`,
  fetchDocumentaries: `/discover?genre=99&language=en-US`,
  fetchSearch: `/search`,
};

export default requests;
