// actions
export const SET_HEAD_TITLE = "setTitle";
import $ from "jquery  ";

export default {
  state: {},
  actions: {
    [SET_HEAD_TITLE](context, title) {
      $("title").text(title + " - MD TAFF");
    }
  },
  getters: {},
  mutations: {}
};
