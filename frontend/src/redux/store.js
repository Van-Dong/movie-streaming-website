import { combineReducers, configureStore } from "@reduxjs/toolkit";
import * as user from "./reducers/userReducers";
import * as favorite from "./reducers/favoriteReducers";
import * as categories from "./reducers/categoryReducers";
import * as movies from "./reducers/movieReducers";
import * as comments from "./reducers/commentReducers";
import * as characters from "./reducers/characterReducers";

const rootReducer = combineReducers({
  userLogin: user.userLoginReducer,
  userRegister: user.userRegisterReducer,
  userDetail: user.userDetailReducer,
  userUpdateProfile: user.userUpdateProfileReducer,
  userChangePassword: user.userChangePasswordReducer,
  userDeleteAccount: user.userDeleteAccountReducer,

  getFavoriteMovies: favorite.getFavoriteMoviesReducer,
  addFavoriteMovie: favorite.addFavoriteMovieReducer,
  deleteFavoriteMovie: favorite.deleteFavoriteMovieReducer,
  deleteAllFavoriteMovie: favorite.deleteAllFavoriteMoviesReducer,

  adminGetAllUsers: user.getAllUsersReducer,
  adminDeleteUser: user.deleteUserReducer,

  categoryGetAll: categories.getAllcategoriesReducer,
  categoryCreate: categories.createCategoryReducer,
  categoryUpdate: categories.updateCategoryReducer,
  categoryDelete: categories.deleteCategoryReducer,

  movieGetAll: movies.getAllMoviesReducer,
  movieGetRandom: movies.getRandomMoviesReducer,
  movieGetTopRated: movies.getTopRatedMoviesReducer,
  movieGetById: movies.getMovieByIdReducer,
  movieGetUrl: movies.getMovieUrlByIdReducer,
  movieDelete: movies.deleteMovieByIdReducer,
  movieUpload: movies.uploadMovieReducer,

  commentGetAll: comments.getCommentsReducer,
  commentPost: comments.postCommentsReducer,

  characterGetAll: characters.getCharactersReducer,
  characterCreate: characters.createCharacterReducer,
  characterDelete: characters.deleteCharacterReducer,
});

const authInfoFromStorage = localStorage.getItem("auth")
  ? JSON.parse(localStorage.getItem("auth"))
  : null;

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

// initialState
const initialState = {
  userLogin: { auth: authInfoFromStorage },
  userDetail: { userInfo: userInfoFromStorage },
};

export const store = configureStore({
  reducer: rootReducer,
  preloadedState: initialState,
  devTools: true,
});
