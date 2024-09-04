import Axios from "./api";

// get comment by movieId
export const getCommentByMovieId = async (movieId, page, size) => {
  const queries = {
    movieId,
    page,
    size,
  };
  const filteredQueries = Object.fromEntries(
    Object.entries(queries).filter(([key, value]) => value !== "")
  );
  const queryParams = new URLSearchParams(filteredQueries).toString();

  const { data } = await Axios.get(`/comments?${queryParams}`);
  return data;
};

// post comment (auth)
export const postCommentByMovieId = async (comment) => {
  const { data } = await Axios.post("/comments", comment);
  return data;
};

// update comment
export const updateCommentByMovieId = async (comment, id) => {
  const { data } = await Axios.put(`/comments/${id}`, comment);
  return data;
};

// delete comment
export const deleteCommentByMovieId = async (id) => {
  const { data } = await Axios.delete(`/comments/${id}`);
  return data;
};
