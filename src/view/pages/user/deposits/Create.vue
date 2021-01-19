<template>
  <div>
    <!--begin::Dashboard-->
    <div class="row justify-content-center">
      <div class="col-md-12">
        <!--begin::Card-->
        <div class="card card-custom gutter-b">
          <div class="card-header">
            <div class="card-title">
              <span
                class="svg-icon svg-icon-lg svg-icon-3x svg-icon-primary mr-3"
              >
                <!--begin::Svg Icon-->
                <inline-svg
                  src="media/svg/icons/Communication/Incoming-box.svg"
                />
                <!--end::Svg Icon-->
              </span>
              <h3 class="card-label">{{ $t("Make a deposit") }}</h3>
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
                    <sup class="font-size-h3 font-weight-normal pl-1">
                      {{ currency }}
                    </sup>
                  </span>
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
                >
                  {{ $t("Amount") }}
                </label>
                <b-form-input
                  required
                  :state="validateState('amount')"
                  v-on:keyup="onAmountChange"
                  v-model="amount"
                  class="form-control form-control-lg form-control-solid"
                  type="number"
                  :placeholder="$t('Amount')"
                  min="200"
                  autocomplete="off"
                />
                <span class="form-text text-muted">
                  {{
                    $t(
                      "You need to pay {depositFee} of your deposit amount as fee",
                      { depositFee: depositFee * 100 + "%" }
                    )
                  }}
                  <br />
                  <strong>
                    {{ $t("Current fee") }}: {{ feeDisplay }} {{ currency }}
                  </strong>
                </span>
                <b-form-invalid-feedback id="input-live-feedback">
                  <p :key="message" v-for="message of errorMessages('amount')">
                    {{ message }}
                  </p>
                </b-form-invalid-feedback>

                <br />

                <div class="col-sm-12 text-center">
                  <button
                    id="btn_submit"
                    class="col-sm-12 col-md-9 col-xl-6 btn btn-success btn-lg font-weight-bolder"
                  >
                    {{ $t("Submit") }}
                  </button>
                </div>

                <payment-secured />
              </form>

              <form :action="paymentUrl" method="post">
                <template v-for="(value, key) of formData">
                  <input :key="key" type="hidden" :name="key" :value="value" />
                </template>
                <input type="hidden" name="return_url" :value="returnUrl" />
                <input type="hidden" name="cancel_url" :value="cancelUrl" />
                <input type="hidden" name="debug" value="true" />
                <input
                  type="submit"
                  id="payment-submit"
                  value="Submit"
                  style="display: none"
                />
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
import { initiateDeposit } from "@/graphql/account-mutations";
import { queryPayment } from "@/graphql/global-queries";
import i18nService from "@/core/services/i18n.service";
import PaymentSecured from "@/view/pages/partials/PaymentSecured";

export default {
  name: "DepositCreate",
  components: { PaymentSecured },
  mixins: [formMixin, toastMixin],
  data() {
    return {
      amount: 200,
      fee: 0,
      errors: [],
      formData: [],
      paymentUrl: null,
      returnUrl: null,
      cancelUrl: null
    };
  },
  computed: {
    ...mapGetters(["currentAccount", "currency", "depositFee"]),
    feeDisplay() {
      return this.fee.toLocaleString(i18nService.getActiveLanguage());
    }
  },
  mounted() {
    this.$store.dispatch(SET_BREADCRUMB, [
      { title: this.$t("Make a deposit") }
    ]);
    this.$store.dispatch(SET_HEAD_TITLE, this.$t("Make a deposit"));

    this.onAmountChange();
  },
  beforeMount() {
    if (this.$route.query.payment !== undefined) {
      this.fetchPayment();
    }
  },
  methods: {
    async onSubmit(evt) {
      evt.preventDefault();

      const btn = window.$("#btn_submit");
      btn.attr("disabled", true);
      btn.addClass("spinner spinner-light spinner-right");

      this.errors = [];

      let result = await this.$apollo.mutate({
        mutation: initiateDeposit,
        variables: {
          amount: this.amount
        }
      });

      btn.removeAttr("disabled");
      btn.removeClass("spinner spinner-light spinner-right");

      this.errors = result.data.initiateDeposit.errors;
      if (!window._.isEmpty(this.errors)) {
        return;
      }

      this.paymentUrl = result.data.initiateDeposit.paymentUrl;
      this.formData = JSON.parse(result.data.initiateDeposit.formData);

      this.cancelUrl =
        process.env.VUE_APP_BASE_URL +
        this.$router.resolve({
          name: "deposits-create"
        }).href;

      this.returnUrl =
        process.env.VUE_APP_BASE_URL +
        this.$router.resolve({
          name: "deposits-create",
          query: { payment: result.data.initiateDeposit.paymentId }
        }).href;

      this.$nextTick(function() {
        window.$("#payment-submit").click();
      });
    },
    async fetchPayment() {
      const result = await this.$apollo.query({
        query: queryPayment,
        variables: {
          id: this.$route.query.payment
        }
      });

      if (window._.isEmpty(result.errors)) {
        if (result.data.payment.confirmed) {
          this.notifySuccess(
            this.$t("You successfully make a deposit of ") +
              result.data.payment.amount +
              " " +
              this.currency
          );
        }

        if (result.data.payment.canceled) {
          this.notifyError(
            this.$t("Error while making deposit of ") +
              result.data.payment.amount +
              " " +
              this.currency
          );
        }
      }

      await this.$router.push({ name: "deposits-create" });
    },
    onAmountChange() {
      this.fee = this.amount * this.depositFee;
    }
  }
};
</script>
