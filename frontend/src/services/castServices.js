import Axios from "./api";

// get characters
export const getCharactersService = async () => {
  const { data } = await Axios.get(`/characters`);
  return data;
};

// post character (auth)
export const createCharacterService = async (character) => {
  const { data } = await Axios.post("/characters", character);
  return data;
};

// update character
export const updateCharacterService = async (id, character) => {
  const { data } = await Axios.put(`/characters/${id}`, character);
  return data;
};

// delete character
export const deleteCharacterService = async (id) => {
  const { data } = await Axios.delete(`/characters/${id}`);
  return data;
};
