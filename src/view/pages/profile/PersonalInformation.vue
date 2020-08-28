<template>
  <div class="flex-row-fluid ml-lg-8">
    <!--begin::Card-->
    <div class="card card-custom card-stretch">
      <!--begin::Header-->
      <div class="card-header py-3">
        <div class="card-title align-items-start flex-column">
          <h3 class="card-label font-weight-bolder text-dark">
            Personal Information
          </h3>
          <span class="text-muted font-weight-bold font-size-sm mt-1"
            >Update your personal information</span
          >
        </div>
        <div class="card-toolbar">
          <button
            @click="onSubmit"
            id="btn_submit"
            type="reset"
            class="btn btn-dark font-weight-bolder mr-2"
          >
            Save Changes
          </button>
          <!--          <button type="reset" class="btn btn-secondary">Cancel</button>-->
        </div>
      </div>
      <!--end::Header-->

      <!--begin::Form-->
      <form class="form" @submit="onSubmit">
        <!--begin::Body-->
        <div class="card-body">
          <div class="form-group row">
            <label class="col-xl-3 col-lg-3 col-form-label">Username</label>
            <div class="col-lg-9 col-xl-6">
              <b-form-input
                required
                :state="validateState('username')"
                v-model="input.username"
                class="form-control form-control-lg form-control-solid"
                type="text"
                placeholder="Username"
                autocomplete="off"
              />
              <b-form-invalid-feedback id="input-live-feedback">
                <p :key="message" v-for="message of errorMessages('username')">
                  {{ message }}
                </p>
              </b-form-invalid-feedback>
            </div>
          </div>

          <div class="form-group row">
            <label class="col-xl-3 col-lg-3 col-form-label">Email</label>
            <div class="col-lg-9 col-xl-6">
              <b-form-input
                required
                :state="validateState('email')"
                v-model="input.email"
                class="form-control form-control-lg form-control-solid"
                type="text"
                placeholder="Email"
                autocomplete="off"
              />
              <b-form-invalid-feedback id="input-live-feedback">
                <p :key="message" v-for="message of errorMessages('email')">
                  {{ message }}
                </p>
              </b-form-invalid-feedback>
            </div>
          </div>

          <div class="form-group row">
            <label class="col-xl-3 col-lg-3 col-form-label">First Name</label>
            <div class="col-lg-9 col-xl-6">
              <b-form-input
                required
                :state="validateState('firstName')"
                v-model="input.firstName"
                class="form-control form-control-lg form-control-solid"
                type="text"
                placeholder="First Name"
                autocomplete="off"
              />
              <b-form-invalid-feedback id="input-live-feedback">
                <p :key="message" v-for="message of errorMessages('firstName')">
                  {{ message }}
                </p>
              </b-form-invalid-feedback>
            </div>
          </div>

          <div class="form-group row">
            <label class="col-xl-3 col-lg-3 col-form-label">Last Name</label>
            <div class="col-lg-9 col-xl-6">
              <b-form-input
                required
                :state="validateState('lastName')"
                v-model="input.lastName"
                class="form-control form-control-lg form-control-solid"
                type="text"
                placeholder="Last Name"
                autocomplete="off"
              />
              <b-form-invalid-feedback id="input-live-feedback">
                <p :key="message" v-for="message of errorMessages('lastName')">
                  {{ message }}
                </p>
              </b-form-invalid-feedback>
            </div>
          </div>
        </div>
        <!--end::Body-->
      </form>
      <!--end::Form-->
    </div>
  </div>
</template>
<style scoped></style>

<script>
import { SET_BREADCRUMB } from "@/core/services/store/modules/breadcrumbs.module";
import { SET_HEAD_TITLE } from "@/core/services/store/modules/htmlhead.module";
import { formMixin } from "@/view/mixins";
import _ from "lodash";
import $ from "jquery";
import { updateAccount } from "@/graphql/account-mutations";
import { UPDATE_USER } from "@/core/services/store/modules/auth.module";

export default {
  name: "personal-information",
  mixins: [formMixin],
  data() {
    return {
      input: _.pick(this.$store.state.auth.account, [
        "username",
        "email",
        "firstName",
        "lastName"
      ])
    };
  },
  mounted() {
    this.$store.dispatch(SET_BREADCRUMB, [{ title: "Personal Information" }]);
    this.$store.dispatch(SET_HEAD_TITLE, "Personal Information");
  },
  methods: {
    async onSubmit() {
      // set spinner to submit button
      const submitButton = $("#btn_submit");
      submitButton.addClass("spinner spinner-light spinner-right");

      this.errors = [];

      let result = await this.$apollo.mutate({
        mutation: updateAccount,
        variables: {
          input: this.input
        }
      });

      this.errors = result.data.updateAccount.errors;
      if (!_.isEmpty(this.errors)) {
        submitButton.removeClass("spinner spinner-light spinner-right");
        return;
      }

      await this.$store.dispatch(UPDATE_USER, {
        account: result.data.updateAccount.account
      });
      submitButton.removeClass("spinner spinner-light spinner-right");
    }
  }
};
</script>
