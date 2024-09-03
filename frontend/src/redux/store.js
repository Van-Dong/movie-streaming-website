import { combineReducers, configureStore } from "@reduxjs/toolkit";
import * as user from "./reducers/userReducers";
import * as favorite from "./reducers/favoriteReducers";
import * as categories from "./reducers/categoryReducers";
import * as movies from "./reducers/movieReducers";

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
