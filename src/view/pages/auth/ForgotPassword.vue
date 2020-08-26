<template>
  <!--begin::Forgot-->
  <div class="login-form login-forgot pt-11">
    <!--begin::Form-->
    <form class="form" novalidate="novalidate" id="kt_login_forgot_form">
      <!--begin::Title-->
      <div class="text-center pb-8">
        <h2 class="font-weight-bolder text-dark font-size-h2 font-size-h1-lg">
          Forgotten Password ?
        </h2>
        <p class="text-muted font-weight-bold font-size-h4">
          Enter your email to reset your password
        </p>
      </div>
      <!--end::Title-->

      <!--begin::Form group-->
      <div class="form-group">
        <input
          class="form-control form-control-solid h-auto py-7 px-6 rounded-lg font-size-h6"
          type="email"
          placeholder="Email"
          name="email"
          autocomplete="off"
        />
      </div>
      <!--end::Form group-->

      <!--begin::Form group-->
      <div class="form-group d-flex flex-wrap flex-center pb-lg-0 pb-3">
        <button
          type="button"
          id="kt_login_forgot_submit"
          class="btn btn-primary font-weight-bolder font-size-h6 px-8 py-4 my-3 mx-4"
        >
          Submit
        </button>
        <router-link
          to="/login"
          v-slot="{ href, navigate, isActive, isExactActive }"
        >
          <a
            :href="href"
            class="btn btn-light-primary font-weight-bolder font-size-h6 px-8 py-4 my-3 mx-4"
            @click="navigate"
          >
            Cancel
          </a>
        </router-link>
      </div>
      <!--end::Form group-->
    </form>
    <!--end::Form-->
  </div>
  <!--end::Forgot-->
</template>

<style lang="scss" scoped>
.spinner.spinner-right {
  padding-right: 3.5rem !important;
}
</style>

<script>
import { LOGIN, LOGOUT } from "@/core/services/store/auth.module";

import { validationMixin } from "vuelidate";
import { email, minLength, required } from "vuelidate/lib/validators";
import { SET_HEAD_TITLE } from "@/core/services/store/htmlhead.module";

export default {
  mixins: [validationMixin],
  name: "forgot-password",
  data() {
    return {
      // Remove this dummy login info
      form: {
        email: "admin@demo.com",
        password: "demo"
      }
    };
  },
  mounted() {
    this.$store.dispatch(SET_HEAD_TITLE, "Forgot Password");
  },
  validations: {
    form: {
      email: {
        required,
        email
      },
      password: {
        required,
        minLength: minLength(3)
      }
    }
  },
  methods: {
    validateState(name) {
      const { $dirty, $error } = this.$v.form[name];
      return $dirty ? !$error : null;
    },
    resetForm() {
      this.form = {
        email: null,
        password: null
      };

      this.$nextTick(() => {
        this.$v.$reset();
      });
    },
    onSubmit() {
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        return;
      }

      const email = this.$v.form.email.$model;
      const password = this.$v.form.password.$model;

      // clear existing errors
      this.$store.dispatch(LOGOUT);

      // set spinner to submit button
      const submitButton = this.$refs["kt_login_signin_submit"];
      submitButton.classList.add("spinner", "spinner-light", "spinner-right");

      // dummy delay
      setTimeout(() => {
        // send login request
        this.$store
          .dispatch(LOGIN, { email, password })
          // go to which page after successfully login
          .then(() => this.$router.push({ name: "dashboard" }));

        submitButton.classList.remove(
          "spinner",
          "spinner-light",
          "spinner-right"
        );
      }, 2000);
    }
  },
  computed: {}
};
</script>
