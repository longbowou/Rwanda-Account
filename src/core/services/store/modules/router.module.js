// action types
export const UPDATE_LAST_PATH = "updateLastPath";

// mutation types
export const SET_LAST_PATH = "setLastPath";

const state = {
  lastPath: null
};

const getters = {
  lastPath(state) {
    return state.lastPath;
  }
};

const actions = {
  [UPDATE_LAST_PATH](context, payload) {
    context.commit(SET_LAST_PATH, payload);
  }
};

const mutations = {
  [SET_LAST_PATH](state, payload) {
    state.lastPath = payload;
  }
};

export default {
  state,
  actions,
  mutations,
  getters
};
