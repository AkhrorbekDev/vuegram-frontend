export function open(state) {
  state.openModel = true;
}

export function close(state) {
  state.openModel = false;
}

export function toggle(state) {
  state.openModel = !state.openModel;
}
