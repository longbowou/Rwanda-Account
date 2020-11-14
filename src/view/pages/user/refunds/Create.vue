<template>
  <div>
    <!--begin::Dashboard-->
    <div class="row justify-content-center">
      <div class="col-md-12">
        <!--begin::Card-->
        <div class="card card-custom gutter-b">
          <div class="card-header">
            <div class="card-title">
              <span class="svg-icon svg-icon-lg svg-icon-3x svg-icon-primary">
                <!--begin::Svg Icon-->
                <inline-svg src="media/svg/icons/Shopping/Dollar.svg" />
                <!--end::Svg Icon-->
              </span>
              <h3 class="card-label">{{ $t("Make a refund") }}</h3>
            </div>
          </div>
          <div class="card-body">
            <div class="row justify-content-center">
              <!--begin: Pricing-->
              <div class="col-md-8 col-xxl-4">
                <div class="pt-17 pb-5 px-5 text-center">
                  <!--begin::Icon-->
                  <div class="d-flex flex-center position-relative mb-20">
                    <span
                      class="svg svg-fill-primary opacity-4 position-absolute"
                    >
                      <svg width="175" height="200">
                        <polyline
                          points="87,0 174,50 174,150 87,200 0,150 0,50 87,0"
                        />
                      </svg>
                    </span>

                    <span class="svg-icon svg-icon-5x svg-icon-primary">
                      <inline-svg
                        src="media/svg/icons/Shopping/Credit-card.svg"
                      />
                    </span>
                  </div>
                  <!--end::Icon-->

                  <!--begin::Content-->
                  <span
                    class="font-size-h1 d-block font-weight-boldest text-dark-75 py-2"
                  >
                    {{ currentAccount != null ? currentAccount.balance : null }}
                    <sup class="font-size-h3 font-weight-normal pl-1">{{
                      currency
                    }}</sup></span
                  >
                  <h4
                    class="font-size-h6 d-block font-weight-bold text-dark-50"
                  >
                    {{ $t("Current balance") }}
                  </h4>
                  <!--end::Content-->
                </div>
              </div>
              <!--end: Pricing-->
            </div>

            <div class="row justify-content-center">
              <form class="form" @submit="onSubmit">
                <label
                  class="col-sm-12 col-form-label font-weight-bold text-center"
                  >{{ $t("Phone Number") }}</label
                >
                <b-form-input
                  required
                  :state="validateState('phoneNumber')"
                  v-model="input.phoneNumber"
                  class="form-control form-control-lg form-control-solid"
                  type="text"
                  :placeholder="$t('Phone Number')"
                />
                <b-form-invalid-feedback id="input-live-feedback">
                  <p
                    :key="message"
                    v-for="message of errorMessages('phoneNumber')"
                  >
                    {{ message }}
                  </p>
                </b-form-invalid-feedback>

                <label
                  class="col-sm-12 col-form-label font-weight-bold text-center"
                  >{{ $t("Amount") }}</label
                >
                <b-form-input
                  required
                  :state="validateState('amount')"
                  v-model="input.amount"
                  class="form-control form-control-lg form-control-solid"
                  type="number"
                  :placeholder="$t('Amount')"
                  min="0"
                  autocomplete="off"
                />
                <b-form-invalid-feedback id="input-live-feedback">
                  <p :key="message" v-for="message of errorMessages('amount')">
                    {{ message }}
                  </p>
                </b-form-invalid-feedback>

                <br />

                <div class="col-sm-12 text-center">
                  <button
                    id="btn_submit"
                    class="col-sm-6 btn btn-success btn-lg font-weight-bolder"
                  >
                    {{ $t("Submit") }}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <!--end::Card-->
      </div>
    </div>
    <!--end::Dashboard-->
  </div>
</template>

<script>
import { SET_BREADCRUMB } from "@/core/services/store/modules/breadcrumbs.module";
import { SET_HEAD_TITLE } from "@/core/services/store/modules/htmlhead.module";
import { mapGetters } from "vuex";
import { formMixin, toastMixin } from "@/view/mixins";
import { initiateRefund } from "@/graphql/account-mutations";

export default {
  name: "RefundCreate",
  mixins: [formMixin, toastMixin],
  data() {
    return {
      input: {
        amount: 0,
        phoneNumber: null
      }
    };
  },
  computed: {
    ...mapGetters(["currentAccount", "currency"])
  },
  mounted() {
    this.$store.dispatch(SET_BREADCRUMB, [{ title: this.$t("Make a refund") }]);
    this.$store.dispatch(SET_HEAD_TITLE, this.$t("Make a refund"));
  },
  methods: {
    async onSubmit(evt) {
      evt.preventDefault();

      const btn = window.$("#btn_submit");
      btn.attr("disabled", true);
      btn.addClass("spinner spinner-light spinner-right");

      this.errors = [];

      let result = await this.$apollo.mutate({
        mutation: initiateRefund,
        variables: {
          input: this.input
        }
      });

      btn.removeAttr("disabled");
      btn.removeClass("disabled spinner spinner-light spinner-right");

      this.errors = result.data.initiateRefund.errors;
      if (!window._.isEmpty(this.errors)) {
        return;
      }

      this.notifySuccess(
        this.$t("You successfully initiate a refund of") +
          " " +
          result.data.initiateRefund.refund.amount +
          " " +
          this.currency
      );

      await this.$router.push({
        name: "refunds"
      });
    }
  }
};
</script>
