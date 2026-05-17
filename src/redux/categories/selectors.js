export const selectCategories = (state) => state.categories.items;
export const selectCategoriesLoading = (state) => state.categories.isLoading;
export const selectCategoriesError = (state) => state.categories.error;

export const selectCategoryById = (categoryId) => (state) =>
  state.categories.items.find((category) => category.id === categoryId);
