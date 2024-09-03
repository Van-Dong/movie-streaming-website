import * as categoryConstants from "../constants/categoryConstants";
import * as categoryApi from "../../services/categoryServices";
import toast from "react-hot-toast";
import { ErrorsAction } from "../ErrorHandler";

// get all categories action
export const getAllCategoriesAction = () => async (dispatch) => {
  dispatch({ type: categoryConstants.GET_ALL_CATEGORIES_REQUEST });
  try {
    const response = await categoryApi.getAllCategoriesService();
    dispatch({
      type: categoryConstants.GET_ALL_CATEGORIES_SUCCESS,
      payload: response.result,
    });
  } catch (error) {
    ErrorsAction(error, dispatch, categoryConstants.GET_ALL_CATEGORIES_FAIL);
    dispatch({ type: categoryConstants.GET_ALL_CATEGORIES_RESET });
  }
};

// create category action
export const createCategoryAction = (category) => async (dispatch) => {
  dispatch({ type: categoryConstants.CREATE_CATEGORY_REQUEST });
  try {
    const response = await categoryApi.createCategoryService(category);
    dispatch({ type: categoryConstants.CREATE_CATEGORY_SUCCESS });
    toast.success("Category Created");
    dispatch({
      type: categoryConstants.GET_ALL_CATEGORIES_AFTER_CREATE,
      payload: response.result,
    });
    dispatch({ type: categoryConstants.CREATE_CATEGORY_RESET });
  } catch (error) {
    ErrorsAction(error, dispatch, categoryConstants.CREATE_CATEGORY_FAIL);
    dispatch({ type: categoryConstants.CREATE_CATEGORY_RESET });
  }
};

// update category action
export const updateCategoryAction = (id, category) => async (dispatch) => {
  dispatch({ type: categoryConstants.UPDATE_CATEGORY_REQUEST });
  try {
    const response = await categoryApi.updateCategoryService(id, category);
    dispatch({
      type: categoryConstants.UPDATE_CATEGORY_SUCCESS,
      payload: response.result,
    });
    toast.success("Category updated");
    dispatch({
      type: categoryConstants.GET_ALL_CATEGORIES_AFTER_UPDATE,
      payload: { ...category, id: id },
    });
    dispatch({ type: categoryConstants.UPDATE_CATEGORY_RESET });
  } catch (error) {
    ErrorsAction(error, dispatch, categoryConstants.UPDATE_CATEGORY_FAIL);
    dispatch({ type: categoryConstants.UPDATE_CATEGORY_RESET });
  }
};

// delete category action
export const deleteCategoryAction = (id) => async (dispatch) => {
  dispatch({ type: categoryConstants.DELETE_CATEGORY_REQUEST });
  try {
    await categoryApi.deleteCategoryService(id);
    dispatch({
      type: categoryConstants.DELETE_CATEGORY_SUCCESS,
    });
    toast.success("Category Deleted");
    dispatch({
      type: categoryConstants.GET_ALL_CATEGORIES_AFTER_DELETE,
      payload: id,
    });
    dispatch({ type: categoryConstants.DELETE_CATEGORY_RESET });
  } catch (error) {
    ErrorsAction(error, dispatch, categoryConstants.DELETE_CATEGORY_FAIL);
    dispatch({ type: categoryConstants.DELETE_CATEGORY_RESET });
  }
};
