<template>
  <!--begin::Signin-->
  <div class="login-form login-signin py-11">
    <!--begin::Form-->
    <form class="form" id="kt_login_signin_form" @submit="onSubmit">
      <!--begin::Title-->
      <div :class="['text-center', hasNotifications ? 'pb-4' : 'pb-8']">
        <h2 class="font-weight-bolder text-dark font-size-h2 font-size-h1-lg">
          {{ $t("Sign In") }}
        </h2>
        <span class="text-muted font-weight-bold font-size-h4"
          >{{ $t("Or") }}
          <router-link
            to="/register"
            v-slot="{ href, navigate, isActive, isExactActive }"
          >
            <a
              :href="href"
              class="text-primary font-weight-bolder"
              @click="navigate"
            >
              {{ $t("Create An Account") }}
            </a>
          </router-link>
        </span>

        <template v-for="(notification, i) of loginNotifications">
          <div
            v-bind:key="i"
            class="d-flex align-items-center bg-light-success rounded p-5 mt-3 mb-0 gutter-b"
          >
            <span
              class="svg-icon svg-icon-success svg-icon-3x pulse pulse-success"
            >
              <inline-svg src="media/svg/icons/Code/Compiling.svg" />
            </span>

            <div class="d-flex flex-column flex-grow-1 mr-9">
              <p
                class="font-weight-normal text-dark-75 text-hover-primary font-size-lg mb-1"
              >
                {{ notification.message }}
              </p>
              <span class="text-muted font-size-sm">
                {{ notification.otherMessage }}
              </span>
            </div>
          </div>
        </template>
      </div>
      <!--end::Title-->

      <!--begin::Form group-->
      <div class="form-group">
        <label class="font-size-h6 font-weight-bolder text-dark">
          {{ $t("Username or Email") }}
        </label>
        <b-form-input
          required
          autofocus
          :state="validateState('login')"
          v-model="input.login"
          class="form-control form-control-solid h-auto py-7 px-6 rounded-lg"
          type="text"
          :placeholder="$t('Username or Email')"
          autocomplete="off"
        />
        <b-form-invalid-feedback id="input-live-feedback">
          <p
            :key="message"
            v-for="message of errorMessages('login')"
            class="m-0"
          >
            {{ message }}
          </p>
        </b-form-invalid-feedback>

        <button
          id="btn-send-verification-mail"
          v-if="canResendVerificationMail"
          @click="sendVerificationMail"
          class="text-primary font-size-h6 font-weight-bolder text-hover-primary"
        >
          {{ $t("Resend a verification mail ?") }}
        </button>
      </div>
      <!--end::Form group-->

      <!--begin::Form group-->
      <div class="form-group">
        <div class="d-flex justify-content-between mt-n5">
          <label class="font-size-h6 font-weight-bolder text-dark pt-5">{{
            $t("Password")
          }}</label>

          <router-link
            :to="{ name: 'forgot' }"
            v-slot="{ href, navigate, isActive, isExactActive }"
          >
            <a
              :href="href"
              class="text-primary font-size-h6 font-weight-bolder text-hover-primary pt-5"
              @click="navigate"
            >
              {{ $t("Forgot Password ?") }}
            </a>
          </router-link>
        </div>

        <b-form-input
          required
          :state="validateState('password')"
          v-model="input.password"
          class="form-control form-control-solid h-auto py-7 px-6 rounded-lg"
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

      <!--begin::Action-->
      <div class="text-center pt-2">
        <button
          id="kt_login_signin_submit"
          class="btn btn-dark font-weight-bolder font-size-h6 px-8 py-4 my-3"
        >
          {{ $t("Sign In") }}
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
import { LOGIN, LOGOUT } from "@/core/services/store/modules/auth.module";
import { SET_HEAD_TITLE } from "@/core/services/store/modules/htmlhead.module";
import { login, sendVerificationMail } from "@/graphql/auth-mutations";
import { formMixin } from "@/view/mixins";
import {
  ADD_LOGIN_NOTIFICATION,
  READ_LOGIN_NOTIFICATIONS
} from "@/core/services/store/modules/notifications.module";
import { RESET_NEXT_PATH } from "@/core/services/store/modules/router.module";
import JwtService from "@/core/services/jwt.service";

export default {
  mixins: [formMixin],
  name: "Login",
  data() {
    return {
      canResendVerificationMail: false,
      input: {
        login: "",
        password: ""
      },
      errors: []
    };
  },
  beforeCreate() {
    if (!window._.isNull(JwtService.getAuth())) {
      this.$router.push({ name: "dashboard" });
    }
  },
  mounted() {
    this.$store.dispatch(SET_HEAD_TITLE, this.$t("Login"));
  },
  methods: {
    async onSubmit(evt) {
      evt.preventDefault();

      // clear existing errors
      await this.$store.dispatch(LOGOUT);

      // set spinner to submit button
      const btn = window.$("#kt_login_signin_submit");
      btn.attr("disabled", true);
      btn.addClass("spinner spinner-light spinner-right");

      this.errors = [];
      this.canResendVerificationMail = false;

      let result = await this.$apollo.mutate({
        mutation: login,
        variables: {
          input: this.input
        }
      });

      btn.removeAttr("disabled");
      btn.removeClass("spinner spinner-light spinner-right");

      this.canResendVerificationMail =
        result.data.login.canResendVerificationMail;
      this.errors = result.data.login.errors;
      if (!window._.isEmpty(this.errors)) {
        return;
      }

      await this.$store.dispatch(LOGIN, {
        account: result.data.login.account,
        auth: result.data.login.auth
      });

      if (!window._.isNull(this.nextPath)) {
        await this.$router.push({ path: this.nextPath });

        await this.$store.dispatch(RESET_NEXT_PATH);
      } else {
        await this.$router.push({ name: "dashboard" });
      }
    },
    async sendVerificationMail() {
      const btn = window.$("#btn-send-verification-mail");
      btn.attr("disabled", true);
      btn.addClass("spinner spinner-primary spinner-right");

      await this.$apollo.mutate({
        mutation: sendVerificationMail,
        variables: {
          login: this.input.login
        }
      });

      btn.removeAttr("disabled");
      btn.removeClass("spinner spinner-primary spinner-right");

      this.canResendVerificationMail = false;

      await this.$store.dispatch(ADD_LOGIN_NOTIFICATION, {
        message: this.$t("Verification mail successfully sent"),
        otherMessage: this.$t(
          "Please check your mailbox and to activate your account."
        )
      });
    }
  },
  computed: {
    ...mapGetters(["isAuthenticated", "loginNotifications", "nextPath"]),
    hasNotifications() {
      return !window._.isEmpty(this.loginNotifications);
    }
  },
  beforeDestroy() {
    this.$store.dispatch(READ_LOGIN_NOTIFICATIONS);
  }
};
</script>
