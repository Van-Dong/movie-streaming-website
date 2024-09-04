import * as commentConstants from "../constants/commentConstants";

export const getCommentsReducer = (state = { comments: [] }, action) => {
  switch (action.type) {
    case commentConstants.GET_COMMENTS_REQUEST:
      return { isLoading: true };
    case commentConstants.GET_COMMENTS_SUCCESS:
      return { isLoading: false, isSuccess: true, comments: action.payload };
    case commentConstants.GET_COMMENTS_UPDATED:
      return {
        ...state,
        comments: [action.payload, ...state.comments],
      };
    case commentConstants.GET_COMMENTS_AFTER_DELETED:
      return {
        ...state,
        comments: state.comments.filter((c) => c.id != action.payload),
      };
    case commentConstants.GET_COMMENTS_FAIL:
      return { isLoading: false, isError: action.payload, comments: [] };
    case commentConstants.GET_COMMENTS_RESET:
      return { comments: [] };
    default:
      return state;
  }
};

export const postCommentsReducer = (state = {}, action) => {
  switch (action.type) {
    case commentConstants.POST_COMMENT_REQUEST:
      return { isLoading: true };
    case commentConstants.POST_COMMENT_SUCCESS:
      return { isLoading: false, isSuccess: true };
    case commentConstants.POST_COMMENT_FAIL:
      return { isLoading: false, isError: action.payload };
    case commentConstants.POST_COMMENT_RESET:
      return {};
    default:
      return state;
  }
};
