export function saveToken(state, data) {
  state.token = data.token;
  state.userDetails = {
    id: data.id,
    login: data.login,
    avatar: data.avatar,
  };
}

export function setIsAuthorized(state, isAuthorized) {
  state.isAuthorized = isAuthorized;
}
