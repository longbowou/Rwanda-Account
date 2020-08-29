import Vue from "vue";
import Vuex from "vuex";

import auth from "./modules/auth.module";
import htmlClass from "./modules/htmlclass.module";
import config from "./modules/config.module";
import breadcrumbs from "./modules/breadcrumbs.module";
import htmlHead from "./modules/htmlhead.module";
import parameters from "./modules/parameters.module";
import router from "./modules/router.module";
import notifications from "./modules/notifications.module";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    htmlClass,
    config,
    breadcrumbs,
    htmlHead,
    parameters,
    router,
    notifications
  }
});
