<template>
  <div class="card card-custom card-stretch">
    <!--begin::Header-->
    <div class="card-header py-3">
      <div class="card-title align-items-start flex-column">
        <h3 class="card-label font-weight-bolder text-dark">
          {{ $t("Personal Information") }}
        </h3>
        <span class="text-muted font-weight-bold font-size-sm mt-1">
          {{ $t("Update your personal information") }}
        </span>
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
          <label class="col-xl-3 col-lg-3 col-form-label font-weight-bold"
            >Avatar</label
          >
          <div class="col-lg-9 col-xl-6">
            <div
              class="image-input image-input-outline image-input-circle"
              id="kt_profile_avatar"
              style="background-image: url(media/user.png);"
            >
              <div
                id="image-input-wrapper-div"
                class="image-input-wrapper"
                :style="[
                  { width: '170px', height: '170px' },
                  currentAccount !== null &&
                    currentAccount.imageUrl !== null && {
                      'background-image': 'url(' + currentAccount.imageUrl + ')'
                    }
                ]"
              ></div>

              <label
                class="btn btn-xs btn-icon btn-circle btn-white btn-hover-text-primary btn-shadow"
                data-action="change"
                data-toggle="tooltip"
                title=""
                data-original-title="Change avatar"
              >
                <i class="fa fa-pen icon-sm text-muted"></i>
                <input
                  type="file"
                  name="profile_avatar"
                  accept=".png, .jpg, .jpeg"
                />
                <input type="hidden" name="profile_avatar_remove" />
              </label>

              <span
                class="btn btn-xs btn-icon btn-circle btn-white btn-hover-text-primary btn-shadow"
                data-action="cancel"
                data-toggle="tooltip"
              >
                <i class="ki ki-bold-close icon-xs text-muted"></i>
              </span>

              <span
                v-if="
                  currentAccount != null && currentAccount.imageUrl !== null
                "
                class="btn btn-xs btn-icon btn-circle btn-white btn-hover-text-primary btn-shadow"
                data-action="remove"
                data-toggle="tooltip"
              >
                <i class="ki ki-bold-close icon-xs text-muted"></i>
              </span>
            </div>
          </div>
        </div>

        <div class="form-group row">
          <label class="col-xl-3 col-lg-3 col-form-label">
            {{ $t("Last Name") }}
          </label>
          <div class="col-lg-9 col-xl-6">
            <b-form-input
              :state="validateState('lastName')"
              v-model="input.lastName"
              class="form-control form-control-lg form-control-solid"
              type="text"
              autofocus
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

        <div class="form-group row">
          <label class="col-xl-3 col-lg-3 col-form-label">
            {{ $t("First Name") }}
          </label>
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
          <label class="col-xl-3 col-lg-3 col-form-label">
            {{ $t("Username") }}
          </label>
          <div class="col-lg-9 col-xl-6">
            <b-form-input
              required
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
          <label class="col-xl-3 col-lg-3 col-form-label">
            {{ $t("Phone Number") }}
          </label>
          <div class="col-lg-9 col-xl-6">
            <b-form-input
              required
              :state="validateState('phoneNumber')"
              v-model="input.phoneNumber"
              class="form-control form-control-lg form-control-solid"
              type="text"
              :placeholder="$t('Phone Number')"
              autocomplete="off"
            />
            <b-form-invalid-feedback id="input-live-feedback">
              <p :key="message" v-for="message of errorMessages('phoneNumber')">
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
</template>
<style scoped></style>

<script>
import { SET_BREADCRUMB } from "@/core/services/store/modules/breadcrumbs.module";
import { SET_HEAD_TITLE } from "@/core/services/store/modules/htmlhead.module";
import { formMixin, toastMixin } from "@/view/mixins";
import { updateAccount } from "@/graphql/account-mutations";
import {
  fetchAccount,
  UPDATE_USER
} from "@/core/services/store/modules/auth.module";
import { mapGetters } from "vuex";
import KTImageInput from "@/assets/js/components/image-input";
import { avatarUploadUrl } from "@/core/server-side/urls";
import JwtService from "@/core/services/jwt.service";

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

    this.updateInput();
    this.initPlugins();
  },
  watch: {
    currentAccount() {
      this.updateInput();
    }
  },
  computed: {
    ...mapGetters(["currentAccount"])
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
        mutation: updateAccount,
        variables: {
          input: this.input
        }
      });

      this.errors = result.data.updateAccount.errors;
      if (!window._.isEmpty(this.errors)) {
        btn.removeAttr("disabled");
        btn.removeClass("spinner spinner-light spinner-right");
        return;
      }

      await this.$store.dispatch(UPDATE_USER, {
        account: result.data.updateAccount.account
      });
      btn.removeClass("disabled spinner spinner-light spinner-right");

      this.notifySuccess("Personal information update successfully.");
    },
    submitForm() {
      window.$("#input_submit").click();
    },
    updateInput() {
      this.input = window._.pick(this.currentAccount, [
        "username",
        "email",
        "phoneNumber",
        "firstName",
        "lastName"
      ]);
      this.$forceUpdate();
    },
    initPlugins() {
      let file = new KTImageInput("kt_profile_avatar");
      file.on("change", function(imageInput) {
        let fd = new FormData();
        fd.append("file", imageInput.input.files[0]);

        const imageInputWrapperDiv = window.$("#image-input-wrapper-div");
        imageInputWrapperDiv.addClass(
          "spinner spinner-lg spinner-warning spinner-center"
        );

        window.$.ajax({
          url: avatarUploadUrl,
          type: "POST",
          data: fd,
          contentType: false,
          processData: false,
          headers: {
            Authorization:
              JwtService.getAuth() !== null
                ? "JWT " + JwtService.getAuth().token
                : null
          },
          success: function() {
            fetchAccount();

            imageInputWrapperDiv.removeClass(
              "spinner spinner-lg spinner-warning spinner-center"
            );
          },
          error: function() {
            imageInputWrapperDiv.removeClass(
              "spinner spinner-lg spinner-warning spinner-center"
            );
          }
        });
      });

      file.on("remove", function() {});
    }
  }
};
</script>
