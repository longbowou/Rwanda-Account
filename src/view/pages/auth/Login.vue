<template>
  <!--begin::Signin-->
  <div class="login-form login-signin py-11">
    <!--begin::Form-->
    <form
      class="form"
      novalidate="novalidate"
      id="kt_login_signin_form"
      @submit="onSubmit"
    >
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
        <label class="font-size-h6 font-weight-bolder text-dark"
          >Email or Phone Number</label
        >
        <b-form-input
          :state="validateState('login')"
          v-model="input.login"
          class="form-control form-control-solid h-auto py-7 px-6 rounded-lg"
          type="text"
          autocomplete="off"
        />
        <b-form-invalid-feedback id="input-live-feedback">
          <p :key="message" v-for="message of errorMessages('login')">
            {{ message }}
          </p>
        </b-form-invalid-feedback>
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

        <b-form-input
          :state="validateState('password')"
          v-model="input.password"
          class="form-control form-control-solid h-auto py-7 px-6 rounded-lg"
          type="password"
          autocomplete="off"
        />
        <b-form-invalid-feedback id="input-live-feedback">
          <p :key="message" v-for="message of errorMessages('password')">
            {{ message }}
          </p>
        </b-form-invalid-feedback>
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
import { mapGetters } from "vuex";
import { validationMixin } from "vuelidate";
import { email, minLength, required } from "vuelidate/lib/validators";
import { LOGIN, LOGOUT } from "@/core/services/store/modules/auth.module";
import { SET_HEAD_TITLE } from "@/core/services/store/modules/htmlhead.module";
import { login } from "@/graphql/auth-mutations";
import $ from "jquery";

export default {
  mixins: [validationMixin],
  name: "login",
  data() {
    return {
      input: {
        login: "",
        password: ""
      },
      errors: []
    };
  },
  beforeMount() {
    if (this.isAuthenticated) {
      this.$router.push({ name: "dashboard" });
    }
  },
  mounted() {
    this.$store.dispatch(SET_HEAD_TITLE, "Login");
  },
  validations: {
    input: {
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
      if (Array.isArray(this.errors)) {
        for (let error of this.errors) {
          if (error.field === name) {
            return false;
          }
        }
      }
      return null;
    },
    errorMessages(name) {
      if (Array.isArray(this.errors)) {
        for (let error of this.errors) {
          if (error.field === name) {
            return error.messages;
          }
        }
      }
      return [];
    },
    async onSubmit(evt) {
      evt.preventDefault();

      // clear existing errors
      await this.$store.dispatch(LOGOUT);

      // set spinner to submit button
      const submitButton = $("#kt_login_signin_submit");
      submitButton.addClass("spinner spinner-light spinner-right");

      this.errors = [];

      let result = await this.$apollo.mutate({
        mutation: login,
        variables: {
          input: this.input
        }
      });

      submitButton.removeClass("spinner spinner-light spinner-right");

      if (result.errors !== undefined && result.errors.length > 0) {
        return;
      }

      this.errors = result.data.login.errors;
      if (this.errors !== undefined && this.errors.length > 0) {
        return;
      }

      this.$store
        .dispatch(LOGIN, {
          account: result.data.login.account,
          auth: result.data.login.auth
        })
        // go to which page after successfully login
        .then(() => this.$router.push({ name: "dashboard" }));
    }
  },
  computed: {
    ...mapGetters(["isAuthenticated"]),
    loginState() {
      return this.validateState("login");
    },
    loginErrorMessages() {
      return this.errorMessages("login");
    }
  }
};
</script>
