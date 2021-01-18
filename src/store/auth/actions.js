export async function registry({ commit }, payload) {
  commit('setIsAuthorized', true);
  commit('saveToken', payload);
}

export async function login({ commit }, payload) {
  commit('setIsAuthorized', true);
  commit('saveToken', payload);
}

export async function logOut({ commit }) {
  commit('logOut');
  commit('setIsAuthorized', false);
}
