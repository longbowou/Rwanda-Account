import JwtService from "@/core/services/jwt.service";

// action types
export const VERIFY_AUTH = "verifyAuth";
export const LOGIN = "login";
export const LOGOUT = "logout";
export const REGISTER = "register";
export const UPDATE_USER = "updateUser";

// mutation types
export const PURGE_AUTH = "logOut";
export const SET_AUTH = "setUser";
export const SET_ERROR = "setError";

const currentAuth = JwtService.getAuth();

const state = {
  account: undefined,
  auth: currentAuth,
  isAuthenticated:
    currentAuth !== null &&
    parseInt(currentAuth.tokenExpiresIn) > Math.floor(Date.now() / 1000)
};

const getters = {
  currentUser(state) {
    return state.account;
  },
  isAuthenticated(state) {
    return state.isAuthenticated;
  },
  isNotAuthenticated(state) {
    return !state.isAuthenticated;
  }
};

const actions = {
  [LOGIN](context, payload) {
    return new Promise(resolve => {
      context.commit(SET_AUTH, payload);
      resolve(payload);
    });
  },
  [LOGOUT](context) {
    context.commit(PURGE_AUTH);
  },
  [UPDATE_USER](context, payload) {
    context.commit(SET_AUTH, payload);
  }
};

const mutations = {
  [SET_AUTH](state, payload) {
    state.isAuthenticated = true;
    if (payload.account !== undefined) {
      state.account = payload.account;
    }
    if (payload.auth !== undefined) {
      state.auth = payload.auth;
      JwtService.saveAuth(state.auth);
    }
  },
  [PURGE_AUTH](state) {
    state.isAuthenticated = false;
    state.account = undefined;
    state.auth = undefined;
    JwtService.destroyAuth();
  }
};

export default {
  state,
  actions,
  mutations,
  getters
};
