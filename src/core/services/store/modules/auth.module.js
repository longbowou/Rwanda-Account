import JwtService from "@/core/services/jwt.service";
import { queryAccount } from "@/graphql/account-queries";
import { apolloClient } from "@/vue-apollo";

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
const isAuthenticated = currentAuth !== null;
if (isAuthenticated) {
  apolloClient.query({ query: queryAccount }).then(result => {
    state.account = result.data.account;
  });
}

const state = {
  account: null,
  auth: currentAuth,
  isAuthenticated: isAuthenticated
};

const getters = {
  currentAccount(state) {
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
    return new Promise(resolve => {
      context.commit(PURGE_AUTH);
      resolve();
    });
  },
  [UPDATE_USER](context, payload) {
    context.commit(SET_AUTH, payload);
  }
};

const mutations = {
  [SET_AUTH](state, payload) {
    state.isAuthenticated = true;
    if (typeof payload.account === "object") {
      state.account = payload.account;
    }

    if (typeof payload.auth === "object") {
      state.auth = payload.auth;
      JwtService.saveAuth(state.auth);
    }
  },
  [PURGE_AUTH](state) {
    state.isAuthenticated = false;
    state.account = null;
    state.auth = null;
    JwtService.destroyAuth();
  }
};

export default {
  state,
  actions,
  mutations,
  getters
};
