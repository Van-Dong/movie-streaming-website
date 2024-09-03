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
      return { isLoading: false, isError: action.payload, movie: {} };
    case movieConstants.GET_MOVIE_BY_ID_RESET:
      return { movie: {} };
    default:
      return state;
  }
};

// Tai sao get movie by id la 4 constant con get All, get random, top rated chi co 3 constant (khong co reset)
// 8:29:00
