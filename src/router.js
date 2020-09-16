import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      redirect: "/home",
      component: () => import("@/view/layout/Layout"),
      children: [
        {
          path: "/home",
          name: "home",
          component: () => import("@/view/pages/home/Home")
        },
        {
          path: "/service/:id",
          name: "service-detail",
          component: () => import("@/view/pages/service/ServiceDetail")
        },
        {
          path: "/service/:id/order",
          name: "service-order",
          component: () => import("@/view/pages/service/ServiceOrder"),
          meta: { requiresAuth: true }
        },
        {
          path: "/dashboard",
          name: "dashboard",
          component: () => import("@/view/pages/user/Dashboard"),
          meta: { requiresAuth: true }
        },
        {
          path: "/deposits",
          name: "deposits",
          component: () => import("@/view/pages/user/deposits/Datatable"),
          meta: { requiresAuth: true }
        },
        {
          path: "/deposits-create",
          name: "deposits-create",
          component: () => import("@/view/pages/user/deposits/Create"),
          meta: { requiresAuth: true }
        },
        {
          path: "/refunds",
          name: "refunds",
          component: () => import("@/view/pages/user/refunds/Datatable"),
          meta: { requiresAuth: true }
        },
        {
          path: "/refunds-create",
          name: "refunds-create",
          component: () => import("@/view/pages/user/refunds/Create"),
          meta: { requiresAuth: true }
        },
        {
          path: "/user/services",
          name: "user-services",
          component: () => import("@/view/pages/user/services/Datatable"),
          meta: { requiresAuth: true }
        },
        {
          path: "/user/services/create",
          name: "user-services-create",
          component: () => import("@/view/pages/user/services/Create"),
          meta: { requiresAuth: true }
        },
        {
          path: "/user/services/:id/edit",
          name: "user-services-edit",
          component: () => import("@/view/pages/user/services/Edit"),
          meta: { requiresAuth: true }
        },
        {
          path: "/user/services/:id",
          name: "user-services-show",
          component: () => import("@/view/pages/user/Dashboard"),
          meta: { requiresAuth: true }
        },
        {
          path: "/user/services/:id/options",
          name: "user-services-options",
          component: () => import("@/view/pages/user/services/Datatable"),
          meta: { requiresAuth: true }
        },
        {
          path: "/user/service/purchases",
          name: "user-service-purchases",
          component: () => import("@/view/pages/user/purchases/Datatable"),
          meta: { requiresAuth: true }
        },
        {
          path: "/profile",
          redirect: "/profile-overview",
          component: () => import("@/view/pages/user/profile/Layout"),
          meta: { requiresAuth: true },
          children: [
            {
              path: "/profile-overview",
              name: "profile-overview",
              component: () =>
                import("@/view/pages/user/profile/ProfileOverview"),
              meta: { requiresAuth: true }
            },
            {
              path: "/personal-information",
              name: "personal-information",
              component: () =>
                import("@/view/pages/user/profile/PersonalInformation"),
              meta: { requiresAuth: true }
            },
            {
              path: "/change-password",
              name: "change-password",
              component: () =>
                import("@/view/pages/user/profile/ChangePassword"),
              meta: { requiresAuth: true }
            }
          ]
        }
      ]
    },
    {
      path: "/",
      component: () => import("@/view/pages/auth/Layout"),
      children: [
        {
          name: "signin",
          path: "/login",
          component: () => import("@/view/pages/auth/Login")
        },
        {
          name: "signup",
          path: "/register",
          component: () => import("@/view/pages/auth/Register")
        },
        {
          name: "forgot",
          path: "/forgot-password",
          component: () => import("@/view/pages/auth/ForgotPassword")
        }
      ]
    },
    {
      path: "/error",
      name: "error",
      component: () => import("@/view/pages/error/Error.vue"),
      children: [
        {
          path: "error-1",
          name: "error-1",
          component: () => import("@/view/pages/error/Error-1.vue")
        },
        {
          path: "error-2",
          name: "error-2",
          component: () => import("@/view/pages/error/Error-2.vue")
        },
        {
          path: "error-3",
          name: "error-3",
          component: () => import("@/view/pages/error/Error-3.vue")
        },
        {
          path: "error-4",
          name: "error-4",
          component: () => import("@/view/pages/error/Error-4.vue")
        },
        {
          path: "error-5",
          name: "error-5",
          component: () => import("@/view/pages/error/Error-5.vue")
        },
        {
          path: "error-6",
          name: "error-6",
          component: () => import("@/view/pages/error/Error-6.vue")
        }
      ]
    },
    {
      path: "*",
      redirect: "/404"
    },
    {
      // the 404 route, when none of the above matches
      path: "/404",
      name: "404",
      component: () => import("@/view/pages/error/Error-1.vue")
    }
  ]
});
