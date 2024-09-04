import * as movieConstants from "../constants/movieConstants";
import * as movieApi from "../../services/movieServices";

// get all movies
export const getAllMoviesReducer = (state = { movies: [] }, action) => {
  switch (action.type) {
    case movieConstants.GET_ALL_MOVIES_REQUEST:
      return { isLoading: true };
    case movieConstants.GET_ALL_MOVIES_SUCCESS:
      return {
        isLoading: false,
        movies: action.payload.movies,
        page: action.payload.page,
        isSuccess: true,
      };
    case movieConstants.GET_ALL_MOVIES_AFTER_DELETE:
      return {
        ...state,
        movies: state.movies.filter((m) => m.id !== action.payload),
      };
    case movieConstants.GET_ALL_MOVIES_FAIL:
      return { isLoading: false, isError: action.payload, movies: [] };
    case movieConstants.GET_ALL_MOVIES_RESET:
      return { movies: [] };
    default:
      return state;
  }
};

// get random movies
export const getRandomMoviesReducer = (state = { movies: [] }, action) => {
  switch (action.type) {
    case movieConstants.GET_RANDOM_MOVIES_REQUEST:
      return { isLoading: true };
    case movieConstants.GET_RANDOM_MOVIES_SUCCESS:
      return {
        isLoading: false,
        movies: action.payload,
        isSuccess: true,
      };
    case movieConstants.GET_RANDOM_MOVIES_FAIL:
      return { isLoading: false, isError: action.payload, movies: [] };
    case movieConstants.GET_RANDOM_MOVIES_RESET:
      return { movies: [] };
    default:
      return state;
  }
};

// get top rated movies
export const getTopRatedMoviesReducer = (state = { movies: [] }, action) => {
  switch (action.type) {
    case movieConstants.GET_TOP_RATED_MOVIES_REQUEST:
      return { isLoading: true };
    case movieConstants.GET_TOP_RATED_MOVIES_SUCCESS:
      return {
        isLoading: false,
        movies: action.payload,
        isSuccess: true,
      };
    case movieConstants.GET_TOP_RATED_MOVIES_FAIL:
      return { isLoading: false, isError: action.payload, movies: [] };
    case movieConstants.GET_TOP_RATED_MOVIES_RESET:
      return { movies: [] };
    default:
      return state;
  }
};

// get movie by id
export const getMovieByIdReducer = (state = { movie: {} }, action) => {
  switch (action.type) {
    case movieConstants.GET_MOVIE_BY_ID_REQUEST:
      return { isLoading: true };
    case movieConstants.GET_MOVIE_BY_ID_SUCCESS:
      return {
        isLoading: false,
        movie: action.payload,
        isSuccess: true,
      };
    case movieConstants.GET_MOVIE_BY_ID_FAIL:
      return { isLoading: false, isError: action.payload };
    case movieConstants.GET_MOVIE_BY_ID_RESET:
      return { movie: {} };
    default:
      return state;
  }
};

// get movie by id
export const getMovieUrlByIdReducer = (state = { movie: {} }, action) => {
  switch (action.type) {
    case movieConstants.GET_MOVIE_URL_BY_ID_REQUEST:
      return { isLoading: true };
    case movieConstants.GET_MOVIE_URL_BY_ID_SUCCESS:
      return {
        isLoading: false,
        movie: action.payload,
        isSuccess: true,
      };
    case movieConstants.GET_MOVIE_URL_BY_ID_FAIL:
      return { isLoading: false, isError: action.payload };
    case movieConstants.GET_MOVIE_URL_BY_ID_RESET:
      return { movie: {} };
    default:
      return state;
  }
};

// delete movie by id
export const deleteMovieByIdReducer = (state = {}, action) => {
  switch (action.type) {
    case movieConstants.DELETE_MOVIE_REQUEST:
      return { isLoading: true };
    case movieConstants.DELETE_MOVIE_SUCCESS:
      return {
        isLoading: false,
        isSuccess: true,
      };
    case movieConstants.DELETE_MOVIE_FAIL:
      return { isLoading: false, isError: action.payload };
    case movieConstants.DELETE_MOVIE_RESET:
      return {};
    default:
      return state;
  }
};

// Upload movie reducer
export const uploadMovieReducer = (state = {}, action) => {
  switch (action.type) {
    case movieConstants.UPLOAD_MOVIE_REQUEST:
      return { isLoading: true };
    case movieConstants.UPLOAD_MOVIE_SUCCESS:
      return {
        isLoading: false,
        isSuccess: true,
        movie: action.payload,
      };
    case movieConstants.UPLOAD_MOVIE_FAIL:
      return { isLoading: false, isError: action.payload };
    case movieConstants.UPLOAD_MOVIE_RESET:
      return {};
    default:
      return state;
  }
};
