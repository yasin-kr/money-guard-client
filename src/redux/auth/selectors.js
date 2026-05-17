export const selectUser = (state) => state.auth.user;
export const selectToken = (state) => state.auth.token;
export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectIsRefreshing = (state) => state.auth.isRefreshing;
export const selectAuthError = (state) => state.auth.error;
export const selectUsername = (state) => {
  const user = state.auth.user;
  const email = user?.email || "";
  return user?.name || email.split("@")[0] || "User";
};
