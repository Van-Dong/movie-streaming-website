import * as favoriteConstants from "../constants/favoriteConstants";
import * as favoriteApi from "../../services/favoriteService";
import { ErrorsAction } from "../ErrorHandler";
import toast from "react-hot-toast";

export const getFavoriteMoviesAction = () => async (dispatch) => {
  dispatch({ type: favoriteConstants.USER_GET_FAVORITE_MOVIES_REQUEST });
  try {
    const response = await favoriteApi.getFavoriteMovies();
    dispatch({
      type: favoriteConstants.USER_GET_FAVORITE_MOVIES_SUCCESS,
      payload: response.result,
    });
  } catch (error) {
    ErrorsAction(
      error,
      dispatch,
      favoriteConstants.USER_GET_FAVORITE_MOVIES_FAIL
    );
    dispatch({ type: favoriteConstants.USER_GET_FAVORITE_MOVIES_RESET });
  }
};

export const addFavoriteMovieAction = (movieId) => async (dispatch) => {
  dispatch({ type: favoriteConstants.USER_ADD_FAVORITE_MOVIE_REQUEST });
  try {
    await favoriteApi.addFavoriteMovie({ movieId });
    dispatch({
      type: favoriteConstants.USER_ADD_FAVORITE_MOVIE_SUCCESS,
    });
  } catch (error) {
    ErrorsAction(
      error,
      dispatch,
      favoriteConstants.USER_ADD_FAVORITE_MOVIE_FAIL
    );
  }
};

export const deleteFavoriteMovieAction = (id) => async (dispatch) => {
  dispatch({ type: favoriteConstants.USER_DELETE_FAVORITE_MOVIE_REQUEST });
  try {
    await favoriteApi.deleteFavoriteMovie(id);
    dispatch({
      type: favoriteConstants.USER_DELETE_FAVORITE_MOVIE_SUCCESS,
    });
    dispatch({
      type: favoriteConstants.USER_GET_FAVORITE_MOVIES_UPDATED,
      payload: id,
    });
    toast.success("Delete successfully!");
    dispatch({ type: favoriteConstants.USER_DELETE_FAVORITE_MOVIE_RESET });
  } catch (error) {
    ErrorsAction(
      error,
      dispatch,
      favoriteConstants.USER_DELETE_FAVORITE_MOVIE_FAIL
    );
    dispatch({ type: favoriteConstants.USER_ADD_FAVORITE_MOVIE_RESET });
  }
};

export const deleteAllFavoriteMoviesAction = () => async (dispatch) => {
  dispatch({ type: favoriteConstants.USER_DELETE_ALL_FAVORITE_MOVIES_REQUEST });
  try {
    await favoriteApi.deleteAllFavoriteMovies();
    dispatch({
      type: favoriteConstants.USER_DELETE_ALL_FAVORITE_MOVIES_SUCCESS,
    });
    dispatch({
      type: favoriteConstants.USER_GET_FAVORITE_MOVIES_RESET,
    });
    toast.success("Delete All successfully!");
  } catch (error) {
    ErrorsAction(
      error,
      dispatch,
      favoriteConstants.USER_DELETE_ALL_FAVORITE_MOVIES_FAIL
    );
    dispatch({ type: favoriteConstants.USER_DELETE_ALL_FAVORITE_MOVIES_RESET });
  }
};
