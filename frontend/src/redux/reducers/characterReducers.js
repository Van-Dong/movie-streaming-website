import * as characterConstants from "../constants/characterConstants";

// Get characters
export const getCharactersReducer = (state = { characters: [] }, action) => {
  switch (action.type) {
    case characterConstants.GET_CHARACTERS_REQUEST:
      return { isLoading: true };
    case characterConstants.GET_CHARACTERS_SUCCESS:
      return {
        isLoading: false,
        characters: action.payload,
        isSuccess: true,
      };
    case characterConstants.GET_CHARACTERS_FAIL:
      return { isLoading: false, isError: action.payload, characters: [] };
    case characterConstants.GET_CHARACTERS_RESET:
      return { characters: [] };
    default:
      return state;
  }
};

// create character
export const createCharacterReducer = (state = {}, action) => {
  switch (action.type) {
    case characterConstants.CREATE_CHARACTER_REQUEST:
      return { isLoading: true };
    case characterConstants.CREATE_CHARACTER_SUCCESS:
      return {
        isLoading: false,
        character: action.payload,
        isSuccess: true,
      };
    case characterConstants.CREATE_CHARACTER_FAIL:
      return { isLoading: false, isError: action.payload };
    case characterConstants.CREATE_CHARACTER_RESET:
      return {};
    default:
      return state;
  }
};

// delete character
export const deleteCharacterReducer = (state = {}, action) => {
  switch (action.type) {
    case characterConstants.DELETE_CHARACTER_REQUEST:
      return { isLoading: true };
    case characterConstants.DELETE_CHARACTER_SUCCESS:
      return {
        isLoading: false,
        isSuccess: true,
      };
    case characterConstants.DELETE_CHARACTER_FAIL:
      return { isLoading: false, isError: action.payload };
    default:
      return state;
  }
};
