<template>
  <!--begin::Signup-->
  <div class="login-form login-signup py-11">
    <!--begin::Form-->
    <form class="form" id="kt_login_signup_form" @submit="onSubmit">
      <!--begin::Title-->
      <div class="text-center pb-8">
        <h2 class="font-weight-bolder text-dark font-size-h2 font-size-h1-lg">
          {{ $t("Sign Up") }}
        </h2>
        <p class="text-muted font-weight-bold font-size-h4">
          {{ $t("Enter your details to create your account") }}
        </p>
      </div>
      <!--end::Title-->

      <!--begin::Form group-->
      <div class="form-group">
        <b-form-input
          required
          autofocus
          :state="validateState('username')"
          v-model="input.username"
          class="form-control form-control-solid h-auto py-7 px-6 rounded-lg font-size-h6"
          type="text"
          :placeholder="$t('Username')"
          autocomplete="off"
        />
        <b-form-invalid-feedback id="input-live-feedback">
          <p :key="message" v-for="message of errorMessages('username')">
            {{ message }}
          </p>
        </b-form-invalid-feedback>
      </div>
      <!--end::Form group-->

      <!--begin::Form group-->
      <div class="form-group">
        <b-form-input
          required
          :state="validateState('email')"
          v-model="input.email"
          class="form-control form-control-solid h-auto py-7 px-6 rounded-lg font-size-h6"
          type="email"
          :placeholder="$t('Email')"
          autocomplete="off"
        />
        <b-form-invalid-feedback id="input-live-feedback">
          <p :key="message" v-for="message of errorMessages('email')">
            {{ message }}
          </p>
        </b-form-invalid-feedback>
      </div>
      <!--end::Form group-->

      <!--begin::Form group-->
      <div class="form-group">
        <b-form-input
          :state="validateState('firstName')"
          v-model="input.firstName"
          class="form-control form-control-solid h-auto py-7 px-6 rounded-lg font-size-h6"
          type="text"
          :placeholder="$t('First Name')"
          autocomplete="off"
        />
        <b-form-invalid-feedback id="input-live-feedback">
          <p :key="message" v-for="message of errorMessages('first_name')">
            {{ message }}
          </p>
        </b-form-invalid-feedback>
      </div>
      <!--end::Form group-->

      <!--begin::Form group-->
      <div class="form-group">
        <b-form-input
          :state="validateState('lastName')"
          v-model="input.lastName"
          class="form-control form-control-solid h-auto py-7 px-6 rounded-lg font-size-h6"
          type="text"
          :placeholder="$t('Last Name')"
          autocomplete="off"
        />
        <b-form-invalid-feedback id="input-live-feedback">
          <p :key="message" v-for="message of errorMessages('lastName')">
            {{ message }}
          </p>
        </b-form-invalid-feedback>
      </div>
      <!--end::Form group-->

      <!--begin::Form group-->
      <div class="form-group">
        <b-form-input
          required
          :state="validateState('password')"
          v-model="input.password"
          class="form-control form-control-solid h-auto py-7 px-6 rounded-lg font-size-h6"
          type="password"
          :placeholder="$t('Password')"
          autocomplete="off"
        />
        <b-form-invalid-feedback id="input-live-feedback">
          <p :key="message" v-for="message of errorMessages('password')">
            {{ message }}
          </p>
        </b-form-invalid-feedback>
      </div>
      <!--end::Form group-->

      <!--begin::Form group-->
      <div class="form-group">
        <b-form-input
          required
          :state="validateState('passwordConfirmation')"
          v-model="input.passwordConfirmation"
          class="form-control form-control-solid h-auto py-7 px-6 rounded-lg font-size-h6"
          type="password"
          :placeholder="$t('Confirm password')"
          autocomplete="off"
        />
        <b-form-invalid-feedback id="input-live-feedback">
          <p
            :key="message"
            v-for="message of errorMessages('passwordConfirmation')"
          >
            {{ message }}
          </p>
        </b-form-invalid-feedback>
      </div>
      <!--end::Form group-->

      <!--begin::Form group-->
      <!--      <div class="form-group">-->
      <!--        <label class="checkbox checkbox-lg mb-0">-->
      <!--          <input type="checkbox" name="agree" />-->
      <!--          <span class="mr-3"></span>-->
      <!--          I Agree the terms and conditions.-->
      <!--        </label>-->
      <!--      </div>-->
      <!--end::Form group-->

      <!--begin::Form group-->
      <div class="form-group d-flex flex-wrap flex-center pb-lg-0 pb-3">
        <button
          type="submit"
          id="kt_login_signup_submit"
          class="btn btn-dark font-weight-bolder font-size-h6 px-8 py-4 my-3 mx-4"
        >
          {{ $t("Submit") }}
        </button>

        <router-link
          :to="{ name: 'signin' }"
          v-slot="{ href, navigate, isActive, isExactActive }"
        >
          <a
            :href="href"
            class="btn btn-light-primary font-weight-bolder font-size-h6 px-8 py-4 my-3 mx-4"
            @click="navigate"
          >
            {{ $t("Cancel") }}
          </a>
        </router-link>
      </div>
      <!--end::Form group-->
    </form>
    <!--end::Form-->
  </div>
  <!--end::Signup-->
</template>

<style lang="scss" scoped>
.spinner.spinner-right {
  padding-right: 3.5rem !important;
}
</style>

<script>
import { LOGOUT } from "@/core/services/store/modules/auth.module";

import { SET_HEAD_TITLE } from "@/core/services/store/modules/htmlhead.module";
import { formMixin } from "@/view/mixins";
import { register } from "@/graphql/auth-mutations";
import { ADD_LOGIN_NOTIFICATION } from "@/core/services/store/modules/notifications.module";

export default {
  name: "Register",
  mixins: [formMixin],
  data() {
    return {
      input: {
        username: "",
        email: "",
        firstName: "",
        lastName: "",
        password: "",
        passwordConfirmation: ""
      }
    };
  },
  methods: {
    async onSubmit(evt) {
      evt.preventDefault();

      // clear existing errors
      await this.$store.dispatch(LOGOUT);

      // set spinner to submit button
      const btn = window.$("#kt_login_signup_submit");
      btn.attr("disabled", true);
      btn.addClass("spinner spinner-light spinner-right");

      this.errors = [];

      let result = await this.$apollo.mutate({
        mutation: register,
        variables: {
          input: this.input
        }
      });

      this.errors = result.data.createAccount.errors;
      if (!window._.isEmpty(this.errors)) {
        btn.removeAttr("disabled");
        btn.removeClass("spinner spinner-light spinner-right");
        return;
      }

      await this.$store.dispatch(ADD_LOGIN_NOTIFICATION, {
        message: this.$t("Registration successful"),
        otherMessage: this.$t(
          "Please check your mail to activate your account."
        )
      });

      await this.$router.push({
        name: "signin"
      });
    }
  },
  mounted() {
    this.$store.dispatch(SET_HEAD_TITLE, "Register");
  },
  computed: {}
};
</script>
