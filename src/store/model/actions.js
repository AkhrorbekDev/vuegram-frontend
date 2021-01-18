export async function open({ commit }) {
  commit('open');
}

export async function close({ commit }) {
  commit('close');
}

export async function toggle({ commit }) {
  commit('toggle');
}
