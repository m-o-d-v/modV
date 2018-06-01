import Vue from 'vue';

const state = {
  selectionX: 0,
  selectionY: 0,
  showCanvas: false,
};

// getters
const getters = {
  selectionX: state => state.selectionX,
  selectionY: state => state.selectionY,
};

// actions
const actions = {

};

// mutations
const mutations = {
  setSelection(state, { selectionX, selectionY }) {
    if (selectionX) Vue.set(state, 'selectionX', selectionX);
    if (selectionY) Vue.set(state, 'selectionY', selectionY);
  },

  setShowCanvas(state, { showCanvas }) {
    Vue.set(state, 'showCanvas', showCanvas);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
