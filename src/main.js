import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "@/core/services/store";
// import ApiService from "@/core/services/api.service";
// import MockService from "@/core/mock/mock.service";
import { RESET_LAYOUT_CONFIG } from "@/core/services/store/modules/config.module";
// Global 3rd party plugins
import "popper.js";
import "tooltip.js";
import PerfectScrollbar from "perfect-scrollbar";
import ClipboardJS from "clipboard";
// Vue 3rd party plugins
import i18n from "@/core/plugins/vue-i18n";
import vuetify from "@/core/plugins/vuetify";

import "@/core/plugins/portal-vue";
import "@/core/plugins/bootstrap-vue";
import "@/core/plugins/perfect-scrollbar";
import "@/core/plugins/highlight-js";
import "@/core/plugins/inline-svg";
import "@/core/plugins/apexcharts";
import "@/core/plugins/metronic";
import "@mdi/font/css/materialdesignicons.css";

import { createProvider } from "./vue-apollo";
import JwtService from "@/core/services/jwt.service";
import {
  UPDATE_LAST_PATH,
  UPDATE_NEXT_PATH
} from "@/core/services/store/modules/router.module";
import { LOGOUT } from "@/core/services/store/modules/auth.module";

Vue.config.productionTip = false;

window.PerfectScrollbar = PerfectScrollbar;
window.ClipboardJS = ClipboardJS;

// API service init
// ApiService.init();

// Remove this to disable mock API
// MockService.init();

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (window._.isNull(JwtService.getAuth())) {
      store.dispatch(UPDATE_NEXT_PATH, to.fullPath).then(() => {
        store.dispatch(LOGOUT).then(() => {
          next({
            name: "signin"
          });
        });
      });
    }
  }

  // Ensure we checked auth before each page load.
  Promise.all([]).then(next);

  // reset config to initial state
  store.dispatch(RESET_LAYOUT_CONFIG);

  if (!to.meta.hasOwnProperty("scrollToTop") || to.meta.scrollToTop) {
    // Scroll page to top on every route change
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 300);
  }
});

router.afterEach(to => {
  store.dispatch(UPDATE_LAST_PATH, to.path);
});

export const vueInstance = new Vue({
  router,
  store,
  i18n,
  vuetify,
  apolloProvider: createProvider(),
  render: h => h(App)
}).$mount("#app");
