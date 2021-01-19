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
          component: () => import("@/view/pages/services/ServiceDetail")
        },
        {
          path: "/service/:id/order",
          name: "service-order",
          component: () => import("@/view/pages/services/ServiceOrder"),
          meta: { requiresAuth: true }
        },
        {
          path: "/service-category/:id",
          name: "service-category",
          component: () => import("@/view/pages/services/Category")
        },
        {
          path: "/activate/:id",
          name: "account-activation",
          component: () => import("@/view/pages/user/Activation")
        },
        {
          path: "/account/dashboard",
          name: "dashboard",
          component: () => import("@/view/pages/user/Dashboard"),
          meta: { requiresAuth: true }
        },
        {
          path: "/account/deposits",
          name: "deposits",
          component: () => import("@/view/pages/user/deposits/Datatable"),
          meta: { requiresAuth: true }
        },
        {
          path: "/account/deposits-create",
          name: "deposits-create",
          component: () => import("@/view/pages/user/deposits/Create"),
          meta: { requiresAuth: true }
        },
        {
          path: "/account/refunds",
          name: "refunds",
          component: () => import("@/view/pages/user/refunds/Datatable"),
          meta: { requiresAuth: true }
        },
        {
          path: "/account/refunds-create",
          name: "refunds-create",
          component: () => import("@/view/pages/user/refunds/Create"),
          meta: { requiresAuth: true }
        },
        {
          path: "/account/services",
          name: "user-services",
          component: () => import("@/view/pages/user/services/Datatable"),
          meta: { requiresAuth: true }
        },
        {
          path: "/account/services/create",
          name: "user-services-create",
          component: () => import("@/view/pages/user/services/Create"),
          meta: { requiresAuth: true }
        },
        {
          path: "/account/services/:id",
          name: "user-services-view",
          component: () => import("@/view/pages/user/services/View"),
          meta: { requiresAuth: true }
        },
        {
          path: "/account/services/:id/edit",
          name: "user-services-edit",
          component: () => import("@/view/pages/user/services/Edit"),
          meta: { requiresAuth: true }
        },
        {
          path: "/account/services/:id/options",
          name: "service-options",
          component: () =>
            import("@/view/pages/user/services/options/Datatable"),
          meta: { requiresAuth: true }
        },

        {
          path: "/account/services/:id/options/:optionId/view",
          name: "service-options-view",
          component: () => import("@/view/pages/user/services/options/View"),
          meta: { requiresAuth: true }
        },
        {
          path: "/account/services/:id/options/create",
          name: "service-options-create",
          component: () => import("@/view/pages/user/services/options/Create"),
          meta: { requiresAuth: true }
        },
        {
          path: "/account/services/:id/options/edit-option/:optionId/edit",
          name: "service-options-edit",
          component: () => import("@/view/pages/user/services/options/Edit"),
          meta: { requiresAuth: true }
        },
        {
          path: "/account/purchases",
          name: "purchases",
          component: () => import("@/view/pages/user/purchases/Datatable"),
          meta: { requiresAuth: true }
        },
        {
          path: "/purchases/:id",
          component: () => import("@/view/pages/user/purchases/View"),
          meta: { requiresAuth: true },
          children: [
            {
              path: "/account/purchases/:id",
              name: "purchases-view",
              component: () =>
                import("@/view/pages/user/purchases/deliverables/Datatable"),
              meta: { requiresAuth: true, scrollToTop: false }
            },
            {
              path: "/account/purchases/:id/deliverables/:deliverableId",
              name: "purchase-deliverables-view",
              component: () =>
                import("@/view/pages/user/purchases/deliverables/View"),
              meta: { requiresAuth: true, scrollToTop: false }
            },
            {
              path: "/account/purchases/:id/deliverables/:deliverableId/files",
              name: "purchase-deliverables-files",
              component: () =>
                import("@/view/pages/user/purchases/deliverables/Files"),
              meta: { requiresAuth: true, scrollToTop: false }
            }
          ]
        },
        {
          path: "/account/orders",
          name: "orders",
          component: () => import("@/view/pages/user/orders/Datatable"),
          meta: { requiresAuth: true }
        },
        {
          path: "/account/orders/:id",
          component: () => import("@/view/pages/user/orders/View"),
          meta: { requiresAuth: true },
          children: [
            {
              path: "/account/orders/:id",
              name: "orders-view",
              component: () =>
                import("@/view/pages/user/orders/deliverables/Datatable"),
              meta: { requiresAuth: true, scrollToTop: false }
            },

            {
              path: "/account/orders/:id/deliverables/create",
              name: "order-deliverables-create",
              component: () =>
                import("@/view/pages/user/orders/deliverables/Create"),
              meta: { requiresAuth: true, scrollToTop: false }
            },
            {
              path: "/account/orders/:id/deliverables/:deliverableId",
              name: "order-deliverables-view",
              component: () =>
                import("@/view/pages/user/orders/deliverables/View"),
              meta: { requiresAuth: true, scrollToTop: false }
            },
            {
              path: "/account/orders/:id/deliverables/:deliverableId/edit",
              name: "order-deliverables-edit",
              component: () =>
                import("@/view/pages/user/orders/deliverables/Edit"),
              meta: { requiresAuth: true, scrollToTop: false }
            },
            {
              path: "/account/orders/:id/deliverables/:deliverableId/files",
              name: "order-deliverables-files",
              component: () =>
                import("@/view/pages/user/orders/deliverables/Files"),
              meta: { requiresAuth: true, scrollToTop: false }
            }
          ]
        },
        {
          path: "/account/profile",
          redirect: "/profile-overview",
          component: () => import("@/view/pages/user/profile/Layout"),
          meta: { requiresAuth: true },
          children: [
            {
              path: "/account/profile-overview",
              name: "profile-overview",
              component: () =>
                import("@/view/pages/user/profile/ProfileOverview"),
              meta: { requiresAuth: true }
            },
            {
              path: "/account/personal-information",
              name: "personal-information",
              component: () =>
                import("@/view/pages/user/profile/PersonalInformation"),
              meta: { requiresAuth: true }
            },
            {
              path: "/account/change-password",
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
      component: () => import("@/view/pages/user/auth/Layout"),
      children: [
        {
          name: "signin",
          path: "/login",
          component: () => import("@/view/pages/user/auth/Login")
        },
        {
          name: "signup",
          path: "/register",
          component: () => import("@/view/pages/user/auth/Register")
        },
        {
          name: "forgot",
          path: "/forgot-password",
          component: () => import("@/view/pages/user/auth/ForgotPassword")
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
