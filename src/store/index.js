import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import posts from './posts';
import auth from './auth';
import model from './model';

Vue.use(Vuex);
const saveToken = createPersistedState({
  key: 'me',
  paths: ['auth'],
});
const saveFile = createPersistedState({
  key: 'file',
  paths: ['posts'],
});
const store = new Vuex.Store({
  modules: {
    posts,
    auth,
    model,
  },

  plugins: [
    saveToken,
    saveFile,
  ],

  strict: process.env.DEBUGGING,
});

export default store;
