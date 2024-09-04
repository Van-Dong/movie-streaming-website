import * as movieConstants from "../constants/movieConstants";
import * as movieApi from "../../services/movieServices";
import toast from "react-hot-toast";
import { ErrorsAction } from "../ErrorHandler";

export const getAllMoviesAction =
  ({
    title = "",
    producingCountry = "",
    yearOfRelease = "",
    studioId = "",
    genreId = "",
    page = "",
    size = "",
  } = {}) =>
  async (dispatch) => {
    dispatch({ type: movieConstants.GET_ALL_MOVIES_REQUEST });
    try {
      const response = await movieApi.getAllMoviesService({
        title,
        producingCountry,
        yearOfRelease,
        studioId,
        genreId,
        page,
        size,
      });
      dispatch({
        type: movieConstants.GET_ALL_MOVIES_SUCCESS,
        payload: { movies: response.result, page: page === "" ? 0 : page },
      });
    } catch (error) {
      ErrorsAction(error, dispatch, movieConstants.GET_ALL_MOVIES_FAIL);
      // dispatch(movieConstants.GET_ALL_MOVIES_RESET);
    }
  };

export const getRandomMoviesAction = () => async (dispatch) => {
  dispatch({ type: movieConstants.GET_RANDOM_MOVIES_REQUEST });
  try {
    const response = await movieApi.getRandomMoviesService();
    dispatch({
      type: movieConstants.GET_RANDOM_MOVIES_SUCCESS,
      payload: response.result,
    });
  } catch (error) {
    ErrorsAction(error, dispatch, movieConstants.GET_RANDOM_MOVIES_FAIL);
    // dispatch(movieConstants.GET_RANDOM_MOVIES_RESET);
  }
};

export const getTopRatedMoviesAction = () => async (dispatch) => {
  dispatch({ type: movieConstants.GET_TOP_RATED_MOVIES_REQUEST });
  try {
    const response = await movieApi.getTopRatedMoviesService();
    dispatch({
      type: movieConstants.GET_TOP_RATED_MOVIES_SUCCESS,
      payload: response.result,
    });
  } catch (error) {
    ErrorsAction(error, dispatch, movieConstants.GET_TOP_RATED_MOVIES_FAIL);
    // dispatch(movieConstants.GET_TOP_RATED_MOVIES_RESET);
  }
};

export const getMovieByIdAction = (id) => async (dispatch) => {
  dispatch({ type: movieConstants.GET_MOVIE_BY_ID_REQUEST });
  try {
    const response = await movieApi.getMovieByIdService(id);
    dispatch({
      type: movieConstants.GET_MOVIE_BY_ID_SUCCESS,
      payload: response.result,
    });
  } catch (error) {
    ErrorsAction(error, dispatch, movieConstants.GET_MOVIE_BY_ID_FAIL);
    // dispatch(movieConstants.GET_MOVIE_BY_ID_RESET);
  }
};

export const getMovieUrlByIdAction = (id) => async (dispatch) => {
  dispatch({ type: movieConstants.GET_MOVIE_URL_BY_ID_REQUEST });
  try {
    const response = await movieApi.getMovieUrlByIdService(id);
    dispatch({
      type: movieConstants.GET_MOVIE_URL_BY_ID_SUCCESS,
      payload: response.result,
    });
  } catch (error) {
    ErrorsAction(error, dispatch, movieConstants.GET_MOVIE_URL_BY_ID_FAIL);
    // dispatch(movieConstants.GET_MOVIE_BY_ID_RESET);
  }
};
