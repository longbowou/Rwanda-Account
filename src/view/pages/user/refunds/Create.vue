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
                  src="media/svg/icons/Communication/Outgoing-box.svg"
                />
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
              <form class="form col-sm-12 col-md-7 col-xl-4" @submit="onSubmit">
                <div class="form-group">
                  <label class="col-sm-12 col-form-label font-weight-bold">
                    {{ $t("Refund Way") }}
                  </label>

                  <b-form-select
                    required
                    v-model="input.refundWay"
                    :options="refundWaysOptions"
                    id="refund-way"
                    class="form-control form-control-lg"
                  ></b-form-select>
                </div>

                <div class="form-group">
                  <label class="col-sm-12 col-form-label font-weight-bold">{{
                    $t("Phone Number")
                  }}</label>
                  <div class="input-group">
                    <div class="input-group-prepend">
                      <span class="input-group-text">
                        {{ refundWayCountryCode }}
                      </span>
                    </div>
                    <b-form-input
                      required
                      :state="validateState('phoneNumber')"
                      v-model="input.phoneNumber"
                      class="form-control form-control-lg"
                      type="text"
                      :placeholder="$t('Phone Number')"
                    />
                  </div>
                  <b-form-invalid-feedback id="input-live-feedback">
                    <p
                      :key="message"
                      v-for="message of errorMessages('phoneNumber')"
                    >
                      {{ message }}
                    </p>
                  </b-form-invalid-feedback>
                </div>

                <div class="form-group">
                  <label class="col-sm-12 col-form-label font-weight-bold">{{
                    $t("Amount")
                  }}</label>
                  <b-form-input
                    required
                    :state="validateState('amount')"
                    v-model="input.amount"
                    class="form-control form-control-lg form-control-solid"
                    type="number"
                    :placeholder="$t('Amount')"
                    min="150"
                    autocomplete="off"
                  />
                  <b-form-invalid-feedback id="input-live-feedback">
                    <p
                      :key="message"
                      v-for="message of errorMessages('amount')"
                    >
                      {{ message }}
                    </p>
                  </b-form-invalid-feedback>
                </div>

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
<style>
.select2-selection {
  min-height: 36px;
}
</style>

<script>
import { SET_BREADCRUMB } from "@/core/services/store/modules/breadcrumbs.module";
import { SET_HEAD_TITLE } from "@/core/services/store/modules/htmlhead.module";
import { mapGetters } from "vuex";
import "select2";
import { formMixin, toastMixin } from "@/view/mixins";
import { initiateRefund } from "@/graphql/account-mutations";
import { queryRefundWays } from "@/graphql/account-queries";

export default {
  name: "RefundCreate",
  mixins: [formMixin, toastMixin],
  data() {
    return {
      refundWays: [],
      refundWayCountryCode: null,
      refundWaySelect2: null,
      input: {
        amount: 150,
        phoneNumber: null,
        refundWay: null
      }
    };
  },
  computed: {
    ...mapGetters(["currentAccount", "currency"]),
    refundWaysOptions() {
      let options = [];
      for (const refundWay of this.refundWays) {
        options.push({ value: refundWay.id, text: refundWay.name });
      }
      return options;
    },
    selectedRefundWayCountryCode() {
      if (this.input.refundWay !== null) {
        return "";
      }
      return "";
    }
  },
  mounted() {
    this.$store.dispatch(SET_BREADCRUMB, [{ title: this.$t("Make a refund") }]);
    this.$store.dispatch(SET_HEAD_TITLE, this.$t("Make a refund"));

    this.refundWaySelect2 = window.$("#refund-way").select2();
    let $this = this;
    window.$("#refund-way").on("select2:select", function() {
      $this.refundWayCountryCode = window._.find($this.refundWays, function(r) {
        return r.id === $this.refundWaySelect2.val();
      }).countryCode;
    });
  },
  methods: {
    async onSubmit(evt) {
      evt.preventDefault();

      const btn = window.$("#btn_submit");
      btn.attr("disabled", true);
      btn.addClass("spinner spinner-light spinner-right");

      this.errors = [];

      this.input.refundWay = this.refundWaySelect2.val();

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
  },
  apollo: {
    refundWays: {
      query: queryRefundWays,
      update: data => data.refundWays
    }
  }
};
</script>
