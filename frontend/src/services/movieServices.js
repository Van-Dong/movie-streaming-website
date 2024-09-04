import Axios from "./api";

// PUBLIC API
// get all movies
export const getAllMoviesService = async ({
  title,
  producingCountry,
  yearOfRelease,
  studioId,
  genreId,
  page,
  size,
}) => {
  // "" sẽ bị bỏ qua
  const params = {
    title,
    producingCountry,
    yearOfRelease,
    studioId,
    genreId,
    page,
    size,
  };

  const filteredParams = Object.fromEntries(
    Object.entries(params).filter(([key, value]) => value !== "")
  );

  const queryParams = new URLSearchParams(filteredParams).toString();
  console.log(queryParams);
  const { data } = await Axios.get(`/movies?${queryParams}`);
  return data;
};

// get random movies
export const getRandomMoviesService = async () => {
  const { data } = await Axios.get("/movies"); // dùng tạm
  return data;
};

// get top rated movies
export const getTopRatedMoviesService = async () => {
  const { data } = await Axios.get("/movies"); // dùng tạm
  return data;
};

// get movie by id
export const getMovieByIdService = async (id) => {
  const { data } = await Axios.get(`/movies/${id}`);
  return data;
};

// get movie url by id
export const getMovieUrlByIdService = async (id) => {
  const { data } = await Axios.get(`/movies/watch/${id}`);
  return data;
};

// delete movie by id
export const deleteMovieByIdService = async (id) => {
  const { data } = await Axios.delete(`/movies/${id}`);
  return data;
};

// upload movie
export const uploadMovieService = async (movie) => {
  const { data } = await Axios.post("/movies/uploadMovie", movie);
  return data;
};
