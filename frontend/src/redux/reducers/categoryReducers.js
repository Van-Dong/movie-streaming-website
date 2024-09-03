import * as categoryConstants from "../constants/categoryConstants";

// Get all categories reducer
export const getAllcategoriesReducer = (state = { categories: [] }, action) => {
  switch (action.type) {
    case categoryConstants.GET_ALL_CATEGORIES_REQUEST:
      return { isLoading: true };
    case categoryConstants.GET_ALL_CATEGORIES_SUCCESS:
      return { isLoading: false, categories: action.payload, isSuccess: true };
    case categoryConstants.GET_ALL_CATEGORIES_AFTER_DELETE:
      return {
        ...state,
        categories: state.categories.filter((c) => c.id != action.payload),
      };
    case categoryConstants.GET_ALL_CATEGORIES_AFTER_CREATE:
      return {
        ...state,
        categories: [...state.categories, action.payload],
      };
    case categoryConstants.GET_ALL_CATEGORIES_AFTER_UPDATE:
      return {
        ...state,
        categories: state.categories.map((c) =>
          c.id == action.payload.id ? { ...c, ...action.payload } : c
        ),
      };
    case categoryConstants.GET_ALL_CATEGORIES_FAIL:
      return { isLoading: false, isError: action.payload, categories: [] };
    case categoryConstants.GET_ALL_CATEGORIES_RESET:
      return { categories: [] };
    default:
      return state;
  }
};

// Create category reducer
export const createCategoryReducer = (state = {}, action) => {
  switch (action.type) {
    case categoryConstants.CREATE_CATEGORY_REQUEST:
      return { isLoading: true };
    case categoryConstants.CREATE_CATEGORY_SUCCESS:
      return { isLoading: false, isSuccess: true, category: action.payload };
    case categoryConstants.CREATE_CATEGORY_FAIL:
      return { isLoading: false, isError: action.payload };
    case categoryConstants.CREATE_CATEGORY_RESET:
      return {};
    default:
      return state;
  }
};

// Update category reducer
export const updateCategoryReducer = (state = {}, action) => {
  switch (action.type) {
    case categoryConstants.UPDATE_CATEGORY_REQUEST:
      return { isLoading: true };
    case categoryConstants.UPDATE_CATEGORY_SUCCESS:
      return { isLoading: false, isSuccess: true, category: action.payload };
    case categoryConstants.UPDATE_CATEGORY_FAIL:
      return { isLoading: false, isError: action.payload };
    case categoryConstants.UPDATE_CATEGORY_RESET:
      return {};
    default:
      return state;
  }
};

// Delete category reducer
export const deleteCategoryReducer = (state = {}, action) => {
  switch (action.type) {
    case categoryConstants.DELETE_CATEGORY_REQUEST:
      return { isLoading: true };
    case categoryConstants.DELETE_CATEGORY_SUCCESS:
      return { isLoading: false, isSuccess: true };
    case categoryConstants.DELETE_CATEGORY_FAIL:
      return { isLoading: false, isError: action.payload };
    case categoryConstants.DELETE_CATEGORY_RESET:
      return {};
    default:
      return state;
  }
};
