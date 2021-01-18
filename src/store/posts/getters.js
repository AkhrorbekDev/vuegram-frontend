export function file(state) {
  return state.items;
}

export function hasItem(state, getters) {
  return (id) => getters.items.includes(id);
}
