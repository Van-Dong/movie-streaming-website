import toast from "react-hot-toast";
import * as characterApi from "../../services/castServices";
import * as characterConstants from "../constants/characterConstants";
import { ErrorsAction } from "../ErrorHandler";

// get characters actions
export const getCharactersAction = () => async (dispatch) => {
  dispatch({ type: characterConstants.GET_CHARACTERS_REQUEST });
  try {
    const response = await characterApi.getCharactersService();
    dispatch({
      type: characterConstants.GET_CHARACTERS_SUCCESS,
      payload: response.result,
    });
  } catch (error) {
    ErrorsAction(error, dispatch, characterConstants.GET_CHARACTERS_FAIL);
  }
};

// create character actions
export const createCharacterAction = (character) => async (dispatch) => {
  dispatch({ type: characterConstants.CREATE_CHARACTER_REQUEST });
  try {
    const response = await characterApi.createCharacterService(character);
    dispatch({
      type: characterConstants.CREATE_CHARACTER_SUCCESS,
      payload: response.result,
    });
    toast.success("Character created");
    dispatch(getCharactersAction());
  } catch (error) {
    ErrorsAction(error, dispatch, characterConstants.CREATE_CHARACTER_FAIL);
  }
};

// delete character actions
export const deleteCharacterAction = (id) => async (dispatch) => {
  dispatch({ type: characterConstants.DELETE_CHARACTER_REQUEST });
  try {
    const response = await characterApi.deleteCharacterService(id);
    dispatch({
      type: characterConstants.DELETE_CHARACTER_SUCCESS,
      payload: response.result,
    });
    toast.success("Character deleted");
  } catch (error) {
    ErrorsAction(error, dispatch, characterConstants.DELETE_CHARACTER_FAIL);
  }
};
