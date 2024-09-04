import * as commentConstants from "../constants/commentConstants";
import * as commentApi from "../../services/commentServices";
import { ErrorsAction } from "../ErrorHandler";

// get comments actions
export const getCommentsAction =
  ({ movieId = "", page = "", size = "" } = {}) =>
  async (dispatch) => {
    dispatch({ type: commentConstants.GET_COMMENTS_REQUEST });
    try {
      const response = await commentApi.getCommentByMovieId(
        movieId,
        page,
        size
      );
      dispatch({
        type: commentConstants.GET_COMMENTS_SUCCESS,
        payload: response.result,
      });
    } catch (error) {
      ErrorsAction(error, dispatch, commentConstants.GET_COMMENTS_FAIL);
    }
  };

// post comment action
export const postCommentAction = (comment) => async (dispatch) => {
  dispatch({ type: commentConstants.POST_COMMENT_REQUEST });
  try {
    const response = await commentApi.postCommentByMovieId(comment);
    dispatch({
      type: commentConstants.POST_COMMENT_SUCCESS,
    });
    dispatch({
      type: commentConstants.GET_COMMENTS_UPDATED,
      payload: response.result,
    });
    dispatch({ type: commentConstants.POST_COMMENT_RESET });
  } catch (error) {
    ErrorsAction(error, dispatch, commentConstants.POST_COMMENT_FAIL);
    dispatch({ type: commentConstants.POST_COMMENT_RESET });
  }
};

// Delete comment action
export const deleteCommentAction = (id) => async (dispatch) => {
  dispatch({ type: commentConstants.DELETE_COMMENT_REQUEST });
  try {
    await commentApi.deleteCommentByMovieId(id);
    dispatch({
      type: commentConstants.DELETE_COMMENT_SUCCESS,
    });
    dispatch({
      type: commentConstants.GET_COMMENTS_AFTER_DELETED,
      payload: id,
    });
    dispatch({ type: commentConstants.DELETE_COMMENT_RESET });
  } catch (error) {
    ErrorsAction(error, dispatch, commentConstants.DELETE_COMMENT_FAIL);
    dispatch({ type: commentConstants.DELETE_COMMENT_RESET });
  }
};
