import Axios from "./api";

// PUBLIC API
// get all category
export const getAllCategoriesService = async () => {
  const { data } = await Axios.get("/category");
  return data;
};

// ADMIN API
// admin create category
export const createCategoryService = async (category) => {
  const { data } = await Axios.post("/category", category);
  return data;
};

// admin update category
export const updateCategoryService = async (id, category) => {
  const { data } = await Axios.put(`/category/${id}`, category);
  return data;
};

// admin delete category
export const deleteCategoryService = async (id) => {
  const { data } = await Axios.delete(`/category/${id}`);
  return data;
};
