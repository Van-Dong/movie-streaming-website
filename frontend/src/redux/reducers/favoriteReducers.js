import * as favoriteConstants from "../constants/favoriteConstants";

export const getFavoriteMoviesReducer = (
  state = { linkedMovies: [] },
  action
) => {
  switch (action.type) {
    case favoriteConstants.USER_GET_FAVORITE_MOVIES_REQUEST:
      return { isLoading: true };
    case favoriteConstants.USER_GET_FAVORITE_MOVIES_SUCCESS:
      return {
        isLoading: false,
        isSuccess: true,
        linkedMovies: action.payload,
      };
    case favoriteConstants.USER_GET_FAVORITE_MOVIES_UPDATED:
      return {
        ...state,
        linkedMovies: state.linkedMovies.filter(
          (item) => item.id !== action.payload
        ),
      };
    case favoriteConstants.USER_GET_FAVORITE_MOVIES_FAIL:
      return { isLoading: false, isError: action.payload, linkedMovies: [] };
    case favoriteConstants.USER_GET_FAVORITE_MOVIES_RESET:
      return { linkedMovies: [] };
    default:
      return state;
  }
};

export const addFavoriteMovieReducer = (state = {}, action) => {
  switch (action.type) {
    case favoriteConstants.USER_ADD_FAVORITE_MOVIE_REQUEST:
      return { isLoading: true };
    case favoriteConstants.USER_ADD_FAVORITE_MOVIE_SUCCESS:
      return {
        isLoading: false,
        isSuccess: true,
      };
    case favoriteConstants.USER_ADD_FAVORITE_MOVIE_FAIL:
      return { isLoading: false, isError: action.payload };
    case favoriteConstants.USER_ADD_FAVORITE_MOVIE_RESET:
      return {};
    default:
      return state;
  }
};

export const deleteFavoriteMovieReducer = (state = {}, action) => {
  switch (action.type) {
    case favoriteConstants.USER_DELETE_FAVORITE_MOVIE_REQUEST:
      return { isLoading: true };
    case favoriteConstants.USER_DELETE_FAVORITE_MOVIE_SUCCESS:
      return {
        isLoading: false,
        isSuccess: true,
      };
    case favoriteConstants.USER_DELETE_FAVORITE_MOVIE_FAIL:
      return { isLoading: false, isError: action.payload };
    case favoriteConstants.USER_DELETE_FAVORITE_MOVIE_RESET:
      return {};
    default:
      return state;
  }
};

export const deleteAllFavoriteMoviesReducer = (state = {}, action) => {
  switch (action.type) {
    case favoriteConstants.USER_DELETE_ALL_FAVORITE_MOVIES_REQUEST:
      return { isLoading: true };
    case favoriteConstants.USER_DELETE_ALL_FAVORITE_MOVIES_SUCCESS:
      return {
        isLoading: false,
        isSuccess: true,
      };
    case favoriteConstants.USER_DELETE_ALL_FAVORITE_MOVIES_FAIL:
      return { isLoading: false, isError: action.payload };
    case favoriteConstants.USER_DELETE_ALL_FAVORITE_MOVIES_RESET:
      return {};
    default:
      return state;
  }
};
