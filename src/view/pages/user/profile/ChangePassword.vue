<template>
  <!--begin::Content-->
  <div class="flex-row-fluid ml-lg-8">
    <!--begin::Card-->
    <div class="card card-custom card-stretch">
      <!--begin::Header-->
      <div class="card-header py-3">
        <div class="card-title align-items-start flex-column">
          <h3 class="card-label font-weight-bolder text-dark">
            Change Password
          </h3>
          <span class="text-muted font-weight-bold font-size-sm mt-1"
            >Change your account password</span
          >
        </div>
        <div class="card-toolbar">
          <button
            @click="submitForm"
            id="btn_submit"
            class="btn btn-success font-weight-bolder"
          >
            Save Changes
          </button>
        </div>
      </div>
      <!--end::Header-->

      <!--begin::Form-->
      <form id="form" class="form" @submit="onSubmit">
        <div class="card-body">
          <div class="form-group row">
            <label class="col-xl-3 col-lg-3 col-form-label text-alert"
              >Current Password</label
            >
            <div class="col-lg-9 col-xl-6">
              <b-form-input
                required
                autofocus
                :state="validateState('currentPassword')"
                v-model="input.currentPassword"
                class="form-control form-control-lg form-control-solid"
                type="password"
                placeholder="Current password"
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
            <label class="col-xl-3 col-lg-3 col-form-label text-alert"
              >New Password</label
            >
            <div class="col-lg-9 col-xl-6">
              <b-form-input
                required
                :state="validateState('password')"
                v-model="input.password"
                class="form-control form-control-lg form-control-solid"
                type="password"
                placeholder="New password"
              />
              <b-form-invalid-feedback id="input-live-feedback">
                <p :key="message" v-for="message of errorMessages('password')">
                  {{ message }}
                </p>
              </b-form-invalid-feedback>
            </div>
          </div>

          <div class="form-group row">
            <label class="col-xl-3 col-lg-3 col-form-label text-alert"
              >New password confirmation</label
            >
            <div class="col-lg-9 col-xl-6">
              <b-form-input
                required
                :state="validateState('passwordConfirmation')"
                v-model="input.passwordConfirmation"
                class="form-control form-control-lg form-control-solid"
                type="password"
                placeholder="New password confirmation"
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
    this.$store.dispatch(SET_BREADCRUMB, [{ title: "Change Password" }]);
    this.$store.dispatch(SET_HEAD_TITLE, "Change Password");
  },
  methods: {
    async onSubmit(evt) {
      evt.preventDefault();

      // set spinner to submit button
      const submitButton = window.$("#btn_submit");
      submitButton.addClass("disabled spinner spinner-light spinner-right");

      this.errors = [];

      let result = await this.$apollo.mutate({
        mutation: changeAccountPassword,
        variables: {
          input: this.input
        }
      });

      this.errors = result.data.changeAccountPassword.errors;
      if (!window._.isEmpty(this.errors)) {
        submitButton.removeClass(
          "disabled spinner spinner-light spinner-right"
        );
        return;
      }

      await this.$store.dispatch(LOGOUT);

      await this.$store.dispatch(UPDATE_NEXT_PATH, this.$route.fullPath);

      await this.$store.dispatch(ADD_LOGIN_NOTIFICATION, {
        message: "Password successful updated",
        otherMessage: "You can now login"
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
