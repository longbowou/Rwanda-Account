<template>
  <!--begin::Signin-->
  <div class="login-form login-signin py-11">
    <!--begin::Form-->
    <form class="form" novalidate="novalidate" id="kt_login_signin_form">
      <!--begin::Title-->
      <div class="text-center pb-8">
        <h2 class="font-weight-bolder text-dark font-size-h2 font-size-h1-lg">
          Sign In
        </h2>
        <span class="text-muted font-weight-bold font-size-h4"
          >Or
          <router-link
            to="/register"
            v-slot="{ href, navigate, isActive, isExactActive }"
          >
            <a
              :href="href"
              class="text-primary font-weight-bolder"
              @click="navigate"
            >
              Create An Account
            </a>
          </router-link>
        </span>
      </div>
      <!--end::Title-->

      <!--begin::Form group-->
      <div class="form-group">
        <label class="font-size-h6 font-weight-bolder text-dark">Email</label>
        <input
          class="form-control form-control-solid h-auto py-7 px-6 rounded-lg"
          type="text"
          name="username"
          autocomplete="off"
        />
      </div>
      <!--end::Form group-->

      <!--begin::Form group-->
      <div class="form-group">
        <div class="d-flex justify-content-between mt-n5">
          <label class="font-size-h6 font-weight-bolder text-dark pt-5"
            >Password</label
          >

          <router-link
            to="forgot-password"
            v-slot="{ href, navigate, isActive, isExactActive }"
          >
            <a
              :href="href"
              class="text-primary font-size-h6 font-weight-bolder text-hover-primary pt-5"
              @click="navigate"
            >
              Forgot Password ?
            </a>
          </router-link>
        </div>

        <input
          class="form-control form-control-solid h-auto py-7 px-6 rounded-lg"
          type="password"
          name="password"
          autocomplete="off"
        />
      </div>
      <!--end::Form group-->

      <!--begin::Action-->
      <div class="text-center pt-2">
        <button
          id="kt_login_signin_submit"
          class="btn btn-dark font-weight-bolder font-size-h6 px-8 py-4 my-3"
        >
          Sign In
        </button>
      </div>
      <!--end::Action-->
    </form>
    <!--end::Form-->
  </div>
  <!--end::Signin-->
</template>

<style lang="scss" scoped>
.spinner.spinner-right {
  padding-right: 3.5rem !important;
}
</style>

<script>
import { mapState } from "vuex";
import { LOGIN, LOGOUT } from "@/core/services/store/auth.module";

import { validationMixin } from "vuelidate";
import { email, minLength, required } from "vuelidate/lib/validators";
import { SET_HEAD_TITLE } from "@/core/services/store/htmlhead.module";

export default {
  mixins: [validationMixin],
  name: "login",
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
    this.$store.dispatch(SET_HEAD_TITLE, "Login");
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
  computed: {
    ...mapState({
      errors: state => state.auth.errors
    })
  }
};
</script>
