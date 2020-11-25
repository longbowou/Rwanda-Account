<template>
  <!--begin::Content-->
  <!--begin::Card-->
  <div class="card card-custom card-stretch">
    <!--begin::Header-->
    <div class="card-header py-3">
      <div class="card-title align-items-start flex-column">
        <h3 class="card-label font-weight-bolder text-dark">
          {{ $t("Change Password") }}
        </h3>
        <span class="text-muted font-weight-bold font-size-sm mt-1">{{
          $t("Change your account password")
        }}</span>
      </div>
      <div class="card-toolbar">
        <button
          @click="submitForm"
          id="btn_submit"
          class="btn btn-success font-weight-bolder"
        >
          {{ $t("Save Changes") }}
        </button>
      </div>
    </div>
    <!--end::Header-->

    <!--begin::Form-->
    <form id="form" class="form" @submit="onSubmit">
      <div class="card-body">
        <div class="form-group row">
          <label class="col-xl-3 col-lg-3 col-form-label text-alert">{{
            $t("Current Password")
          }}</label>
          <div class="col-lg-9 col-xl-6">
            <b-form-input
              required
              autofocus
              :state="validateState('currentPassword')"
              v-model="input.currentPassword"
              class="form-control form-control-lg form-control-solid"
              type="password"
              :placeholder="$t('Current Password')"
            />
            <b-form-invalid-feedback id="input-live-feedback">
              <p
                :key="message"
                v-for="message of errorMessages('currentPassword')"
              >
                {{ message }}
              </p>
            </b-form-invalid-feedback>
          </div>
        </div>

        <div class="form-group row">
          <label class="col-xl-3 col-lg-3 col-form-label text-alert">{{
            $t("New Password")
          }}</label>
          <div class="col-lg-9 col-xl-6">
            <b-form-input
              required
              :state="validateState('password')"
              v-model="input.password"
              class="form-control form-control-lg form-control-solid"
              type="password"
              :placeholder="$t('New Password')"
            />
            <b-form-invalid-feedback id="input-live-feedback">
              <p :key="message" v-for="message of errorMessages('password')">
                {{ message }}
              </p>
            </b-form-invalid-feedback>
          </div>
        </div>

        <div class="form-group row">
          <label class="col-xl-3 col-lg-3 col-form-label text-alert">{{
            $t("New password confirmation")
          }}</label>
          <div class="col-lg-9 col-xl-6">
            <b-form-input
              required
              :state="validateState('passwordConfirmation')"
              v-model="input.passwordConfirmation"
              class="form-control form-control-lg form-control-solid"
              type="password"
              :placeholder="$t('New password confirmation')"
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

          <input id="input_submit" type="submit" style="display: none" />
        </div>
      </div>
    </form>
    <!--end::Form-->
  </div>
  <!--end::Content-->
</template>
<style scoped></style>

<script>
import { SET_BREADCRUMB } from "@/core/services/store/modules/breadcrumbs.module";
import { SET_HEAD_TITLE } from "@/core/services/store/modules/htmlhead.module";
import { formMixin } from "@/view/mixins";
import { changeAccountPassword } from "@/graphql/account-mutations";
import { LOGOUT } from "@/core/services/store/modules/auth.module";
import { UPDATE_NEXT_PATH } from "@/core/services/store/modules/router.module";
import { ADD_LOGIN_NOTIFICATION } from "@/core/services/store/modules/notifications.module";

export default {
  name: "ChangePassword",
  mixins: [formMixin],
  data() {
    return {
      input: {
        currentPassword: null,
        password: null,
        passwordConfirmation: null
      },
      errors: []
    };
  },
  mounted() {
    this.$store.dispatch(SET_BREADCRUMB, [
      { title: this.$t("Change Password") }
    ]);
    this.$store.dispatch(SET_HEAD_TITLE, this.$t("Change Password"));
  },
  methods: {
    async onSubmit(evt) {
      evt.preventDefault();

      // set spinner to submit button
      const btn = window.$("#btn_submit");
      btn.attr("disabled", true);
      btn.addClass("spinner spinner-light spinner-right");

      this.errors = [];

      let result = await this.$apollo.mutate({
        mutation: changeAccountPassword,
        variables: {
          input: this.input
        }
      });

      this.errors = result.data.changeAccountPassword.errors;
      if (!window._.isEmpty(this.errors)) {
        btn.removeAttr("disabled");
        btn.removeClass("spinner spinner-light spinner-right");
        return;
      }

      await this.$store.dispatch(LOGOUT);

      await this.$store.dispatch(UPDATE_NEXT_PATH, this.$route.fullPath);

      await this.$store.dispatch(ADD_LOGIN_NOTIFICATION, {
        message: this.$t("Password successfully updated"),
        otherMessage: this.$t("You can now login")
      });

      await this.$router.push({
        name: "signin"
      });
    },
    submitForm() {
      window.$("#input_submit").click();
    }
  }
};
</script>
