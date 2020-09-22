// action types
export const UPDATE_PURCHASE_OPTIONS = "updateServiceOptions";
export const RESET_PURCHASE_OPTIONS = "resetServiceOptions";

// mutation types
export const SET_SELECTED_OPTIONS = "setServiceOptions";
export const SET_SELECTED_OPTIONS_TO_NULL = "setServiceOptionsToNull";

const state = {
  selectedOptions: null
};

const getters = {
  purchaseServiceOptions(state) {
    return state.selectedOptions;
  }
};

const actions = {
  [UPDATE_PURCHASE_OPTIONS](context, payload) {
    context.commit(SET_SELECTED_OPTIONS, payload);
  },
  [RESET_PURCHASE_OPTIONS](context) {
    context.commit(SET_SELECTED_OPTIONS_TO_NULL);
  }
};

const mutations = {
  [SET_SELECTED_OPTIONS](state, payload) {
    state.selectedOptions = payload;
  },
  [SET_SELECTED_OPTIONS_TO_NULL](state) {
    state.selectedOptions = null;
  }
};

export default {
  state,
  actions,
  mutations,
  getters
};
