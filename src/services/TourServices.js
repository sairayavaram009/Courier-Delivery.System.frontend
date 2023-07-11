import apiClient from "./services";

export default {
  getRecipes() {
    return apiClient.get("courier");
  },
  getRecipesByUserId(userId) {
    return apiClient.get("courier/user/" + userId);
  },
  getRecipe(id) {
    return apiClient.get("courier/" + id);
  },
  addRecipe(recipe) {
    return apiClient.post("courier", recipe);
  },
  updateRecipe(recipeId, recipe) {
    return apiClient.put("courier/" + recipeId, recipe);
  },
  deleteRecipe(recipeId) {
    return apiClient.delete("courier/" + recipeId);
  },
};
