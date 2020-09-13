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
          path: "/detail",
          name: "detail",
          component: () => import("@/view/pages/home/Detail")
        },
        {
          path: "/dashboard",
          name: "dashboard",
          component: () => import("@/view/pages/Dashboard"),
          meta: { requiresAuth: true }
        },
        {
          path: "/profile",
          redirect: "/profile-overview",
          component: () => import("@/view/pages/profile/Layout"),
          meta: { requiresAuth: true },
          children: [
            {
              path: "/profile-overview",
              name: "profile-overview",
              component: () => import("@/view/pages/profile/ProfileOverview"),
              meta: { requiresAuth: true }
            },
            {
              path: "/personal-information",
              name: "personal-information",
              component: () =>
                import("@/view/pages/profile/PersonalInformation"),
              meta: { requiresAuth: true }
            },
            {
              path: "/change-password",
              name: "change-password",
              component: () => import("@/view/pages/profile/ChangePassword"),
              meta: { requiresAuth: true }
            }
          ]
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
