<template>
  <div class="d-flex flex-column flex-root">
    <!--begin::Login-->
    <div
      :class="
        'login-' +
          className +
          '-on login login-2 d-flex flex-column flex-lg-row flex-column-fluid bg-white'
      "
      id="kt_login"
    >
      <!--begin::Aside-->
      <div
        class="login-aside order-2 order-lg-1 d-flex flex-row-auto position-relative overflow-hidden"
      >
        <!--begin: Aside Container-->
        <div
          class="d-flex flex-column-fluid flex-column justify-content-between py-9 px-7 py-lg-13 px-lg-35"
        >
          <!--begin::Logo-->
          <!--          <a href="#" class="text-center pt-2">-->
          <!--            <img :src="logo" class="max-h-75px" alt="" />-->
          <!--          </a>-->
          <!--end::Logo-->

          <!--begin::Aside body-->
          <div class="d-flex flex-column-fluid flex-column flex-center">
            <router-view></router-view>
          </div>
          <!--end::Aside body-->
        </div>
        <!--end: Aside Container-->
      </div>
      <!--begin::Aside-->

      <!--begin::Content-->
      <div
        class="content order-1 order-lg-2 d-flex flex-column w-100 pb-0"
        style="background-color: #B1DCED;"
      >
        <!--begin::Title-->
        <div
          class="d-flex flex-column justify-content-center text-center pt-lg-40 pt-md-5 pt-sm-5 px-lg-0 pt-5 px-7"
        >
          <h3
            class="display4 font-weight-bolder my-7 text-dark"
            style="color: #986923;"
          >
            Amazing Wireframes
          </h3>
          <p
            class="font-weight-bolder font-size-h2-md font-size-lg text-dark opacity-70"
          >
            User Experience & Interface Design, Product Strategy<br />
            Web Application SaaS Solutions
          </p>
        </div>
        <!--end::Title-->

        <!--begin::Image-->
        <div
          class="content-img d-flex flex-row-fluid bgi-no-repeat bgi-position-y-bottom bgi-position-x-center"
          :style="{ backgroundImage: `url(${backgroundImage})` }"
        ></div>
        <!--end::Image-->
      </div>
      <!--end::Content-->
    </div>
    <!--end::Login-->
  </div>
</template>

<!-- Load login custom page styles -->
<style lang="scss">
@import "@/assets/sass/pages/login/login-2.scss";
</style>

<script>
import { mapState } from "vuex";
import { ADD_BODY_CLASSNAME } from "@/core/services/store/htmlclass.module";

export default {
  name: "auth",
  methods: {},
  beforeMount() {
    this.$store.dispatch(ADD_BODY_CLASSNAME, "quick-panel-right");
    this.$store.dispatch(ADD_BODY_CLASSNAME, "demo-panel-right");
    this.$store.dispatch(ADD_BODY_CLASSNAME, "offcanvas-right");
    this.$store.dispatch(ADD_BODY_CLASSNAME, "header-fixed");
    this.$store.dispatch(ADD_BODY_CLASSNAME, "subheader-enabled");
  },
  mounted() {},
  computed: {
    className() {
      return this.$route.name;
    },
    ...mapState({
      errors: state => state.auth.errors
    }),
    backgroundImage() {
      return (
        process.env.BASE_URL + "media/svg/illustrations/login-visual-2.svg"
      );
    }
  }
};
</script>
