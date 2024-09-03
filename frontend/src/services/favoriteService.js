import Axios from "./api";

// AUTH API
// get favorite movies api
export const getFavoriteMovies = async () => {
  const { data } = await Axios.get("/favorites");
  return data;
};

// add favorite movies api
export const addFavoriteMovie = async (movieId) => {
  const { data } = await Axios.post("favorites", movieId);
  return data;
};

// delete movie from favorite api
export const deleteFavoriteMovie = async (id) => {
  const { data } = await Axios.delete(`/favorites/${id}`);
  return data;
};

// delete all movie from favorite api
export const deleteAllFavoriteMovies = async () => {
  const { data } = await Axios.delete("/favorites/all");
  return data;
};
