<template>
  <div class="flex-row-fluid ml-lg-8">
    <!--begin::Card-->
    <div class="card card-custom card-stretch">
      <!--begin::Header-->
      <div class="card-header py-3">
        <div class="card-title align-items-start flex-column">
          <h3 class="card-label font-weight-bolder text-dark">
            {{ $t("Personal Information") }}
          </h3>
          <span class="text-muted font-weight-bold font-size-sm mt-1">{{
            $t("Update your personal information")
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
          <!--          <button type="reset" class="btn btn-secondary">Cancel</button>-->
        </div>
      </div>
      <!--end::Header-->

      <!--begin::Form-->
      <form class="form" @submit="onSubmit">
        <!--begin::Body-->
        <div class="card-body">
          <div class="form-group row">
            <label class="col-xl-3 col-lg-3 col-form-label">{{
              $t("Username")
            }}</label>
            <div class="col-lg-9 col-xl-6">
              <b-form-input
                required
                autofocus
                :state="validateState('username')"
                v-model="input.username"
                class="form-control form-control-lg form-control-solid"
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
            <label class="col-xl-3 col-lg-3 col-form-label">{{
              $t("First Name")
            }}</label>
            <div class="col-lg-9 col-xl-6">
              <b-form-input
                :state="validateState('firstName')"
                v-model="input.firstName"
                class="form-control form-control-lg form-control-solid"
                type="text"
                :placeholder="$t('First Name')"
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
            <label class="col-xl-3 col-lg-3 col-form-label">{{
              $t("Last Name")
            }}</label>
            <div class="col-lg-9 col-xl-6">
              <b-form-input
                :state="validateState('lastName')"
                v-model="input.lastName"
                class="form-control form-control-lg form-control-solid"
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
          </div>

          <input id="input_submit" type="submit" style="display: none" />
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
import { formMixin, toastMixin } from "@/view/mixins";
import { updateAccount } from "@/graphql/account-mutations";
import { UPDATE_USER } from "@/core/services/store/modules/auth.module";

export default {
  name: "PersonalInformation",
  mixins: [formMixin, toastMixin],
  data() {
    return {
      input: {}
    };
  },
  mounted() {
    this.$store.dispatch(SET_BREADCRUMB, [
      { title: this.$t("Personal Information") }
    ]);
    this.$store.dispatch(SET_HEAD_TITLE, this.$t("Personal Information"));

    this.input = window._.pick(this.$store.state.auth.account, [
      "username",
      "email",
      "firstName",
      "lastName"
    ]);
    this.$forceUpdate();
  },
  methods: {
    async onSubmit(evt) {
      evt.preventDefault();

      // set spinner to submit button
      const submitButton = window.$("#btn_submit");
      submitButton.attr("disabled", true);
      submitButton.addClass("disabled spinner spinner-light spinner-right");

      this.errors = [];

      let result = await this.$apollo.mutate({
        mutation: updateAccount,
        variables: {
          input: this.input
        }
      });

      this.errors = result.data.updateAccount.errors;
      if (!window._.isEmpty(this.errors)) {
        submitButton.removeAttr("disabled");
        submitButton.removeClass(
          "disabled spinner spinner-light spinner-right"
        );
        return;
      }

      await this.$store.dispatch(UPDATE_USER, {
        account: result.data.updateAccount.account
      });
      submitButton.removeClass("disabled spinner spinner-light spinner-right");

      this.notifySuccess("Personal information update successfully.");
    },
    submitForm() {
      window.$("#input_submit").click();
    }
  }
};
</script>
