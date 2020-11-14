<template>
  <div class="row">
    <div class="col-sm-12 col-md-8">
      <div class="card card-custom shadow-sm mb-5">
        <div class="card-header">
          <div class="card-title">
            <span
              class="svg-icon svg-icon-lg svg-icon-3x svg-icon-primary mr-3"
            >
              <!--begin::Svg Icon-->
              <inline-svg src="media/svg/icons/Shopping/Cart1.svg" />
              <!--end::Svg Icon-->
            </span>

            <h3 class="card-label">
              {{ $t("Order summary") }}
            </h3>
          </div>
        </div>

        <div class="card-body">
          <div class="row mb-2">
            <h3 class="col-sm-9 text-primary font-weight-bold">
              {{
                serviceOrderPreview.service
                  ? serviceOrderPreview.service.title
                  : null
              }}
            </h3>
            <h3 class="col-sm-3 text-primary font-weight-bold text-right">
              {{ serviceOrderPreview.basePrice }} {{ currency }}
            </h3>
          </div>

          <div v-if="hasOptions">
            <div class="row justify-content-center mb-3">
              <div class="col-10">
                <hr />
              </div>
            </div>

            <template
              v-for="(serviceOption,
              index) of serviceOrderPreview.serviceOptions"
            >
              <div
                :key="serviceOption.id"
                class="row justify-content-center mb-2"
              >
                <h6 class="col-sm-9 font-weight-bold">
                  {{ serviceOption.label }}<br />
                  <small>{{ serviceOption.delayPreviewDisplay }}</small>
                </h6>
                <h5 class="col-sm-3 font-weight-bold text-right">
                  {{ serviceOption.price }} {{ currency }}
                </h5>
                <div
                  class="col-10"
                  v-if="index < serviceOrderPreview.serviceOptions.length - 1"
                >
                  <hr />
                </div>
              </div>
            </template>
          </div>

          <hr />

          <div class="row">
            <p class="col-sm-9">
              {{ $t("Delivery delay") }}
            </p>
            <p class="col-sm-3 text-right">
              {{ serviceOrderPreview.totalDelay }} days <br />
              <span
                class="text-primary"
                v-html="
                  $t(
                    'Deadline will be set to <br /><strong>{deadlineAt}</strong><br /> if the order is accepted today.',
                    { deadlineAt: serviceOrderPreview.deadlineAt }
                  )
                "
              >
              </span>
            </p>
          </div>
        </div>
      </div>

      <div class="card card-custom shadow-sm mb-5">
        <div class="card-header">
          <div class="card-title">
            <span
              class="svg-icon svg-icon-lg svg-icon-3x svg-icon-primary mr-3"
            >
              <!--begin::Svg Icon-->
              <inline-svg src="media/svg/icons/Shopping/Cart2.svg" />
              <!--end::Svg Icon-->
            </span>

            <h3 class="card-label">
              {{ $t("Price detail") }}
            </h3>
          </div>
        </div>

        <div class="card-body">
          <h5>{{ $t("Seller Payment") }}</h5>

          <div class="row mb-2">
            <p class="col-sm-9">
              {{ $t("Amount") }}
            </p>
            <p class="col-sm-3 font-weight-bold text-right">
              {{ serviceOrderPreview.totalPrice }} {{ currency }}
            </p>
          </div>

          <div class="row mb-2">
            <p class="col-sm-9">
              TVA
            </p>
            <p class="col-sm-3 font-weight-bold text-right">
              {{ serviceOrderPreview.totalPriceTva }} {{ currency }}
            </p>
          </div>

          <hr />

          <h5>{{ $t("Fee") }}</h5>

          <div class="row mb-2">
            <p class="col-sm-9">
              {{ $t("MDTAF's Commission") }}
            </p>
            <p class="col-sm-3 font-weight-bold text-right">
              {{ serviceOrderPreview.commission }} {{ currency }}
            </p>
          </div>

          <div class="row mb-2">
            <p class="col-sm-9">
              TVA 0 %
            </p>
            <p class="col-sm-3 font-weight-bold text-right">
              {{ serviceOrderPreview.commissionTva }} {{ currency }}
            </p>
          </div>

          <hr />

          <h5>TOTAL</h5>

          <div class="row mb-2">
            <p class="col-sm-9">
              TOTAL HT
            </p>
            <p class="col-sm-3 font-weight-bold text-right">
              {{ serviceOrderPreview.totalOrderPrice }} {{ currency }}
            </p>
          </div>

          <div class="row mb-2">
            <p class="col-sm-9">
              TOTAL TTC
            </p>
            <p class="col-sm-3 font-weight-bold text-right">
              {{ serviceOrderPreview.totalOrderPriceTtc }} {{ currency }}
            </p>
          </div>

          <hr />
        </div>
      </div>

      <div class="card card-custom shadow-sm mb-5">
        <div class="card-header">
          <div class="card-title">
            <span
              class="svg-icon svg-icon-lg svg-icon-3x svg-icon-primary mr-3"
            >
              <!--begin::Svg Icon-->
              <inline-svg src="media/svg/icons/Shopping/Credit-card.svg" />
              <!--end::Svg Icon-->
            </span>

            <h3 class="card-label">
              {{ $t("Payment Method") }}
            </h3>
          </div>
        </div>
        <div class="card-body">
          <p class="text-center text-dark-75">
            {{ $t("Choose a payment method to pay for your order.") }} <br />
            {{
              $t(
                "You can also pay with your MDTAF wallet free of charge if you have a sufficient balance."
              )
            }}
          </p>

          <div class="row justify-content-center">
            <div
              v-if="serviceOrderPreview.cannotPayWithWallet"
              class="col-sm-6 alert alert-custom alert-light-warning"
              role="alert"
            >
              <div class="alert-icon">
                <span
                  class="svg-icon svg-icon-lg svg-icon-3x svg-icon-warning mr-3"
                >
                  <!--begin::Svg Icon-->
                  <inline-svg src="media/svg/icons/Code/Warning-1-circle.svg" />
                  <!--end::Svg Icon-->
                </span>
              </div>
              <div class="alert-text">
                <h5>
                  {{
                    $t("You don't have enough balance to pay with your Wallet.")
                  }}
                </h5>
              </div>
            </div>

            <div class="col-md-12 text-center m-5">
              <a
                id="wallet"
                href="javascript:void(0);"
                @click.prevent="toggleBtn"
                :class="getClasses"
              >
                <div class="pt-17 pb-5 px-5 text-center">
                  <!--begin::Icon-->
                  <div class="d-flex flex-center position-relative">
                    <span
                      class="svg svg-fill-primary opacity-10 position-absolute"
                    >
                      <svg width="175" height="200">
                        <polyline
                          points="87,0 174,50 174,150 87,200 0,150 0,50 87,0"
                        />
                      </svg>
                    </span>

                    <span
                      class="font-size-h1 d-block font-weight-boldest text-dark-75 py-2"
                    >
                      {{
                        currentAccount != null ? currentAccount.balance : null
                      }}
                      <sup class="font-size-h3 font-weight-normal pl-1">{{
                        currency
                      }}</sup>
                    </span>
                  </div>
                  <h4
                    class="font-size-h6 d-block font-weight-bold text-dark-50"
                  >
                    {{ $t("Wallet Balance") }}
                  </h4>
                  <!--end::Icon-->

                  <!--begin::Content-->

                  <!--end::Content-->
                </div>
              </a>
            </div>

            <div class="col-sm-4 mt-7">
              <b-btn
                :disabled="cannotProceedPayment"
                id="proceed-btn"
                @click="initServicePurchase"
                class="btn btn-success btn-block font-weight-bold btn-square"
                >{{ $t("Proceed to Payment") }}</b-btn
              >
              <hr />
              <p class="text-center font-weight-bold m-0">
                {{ $t("Payment") }}
                <span class="text-success"
                  ><i class="flaticon2-lock text-success" />
                  {{ $t("Secured") }}</span
                >
                <br />
                <small>{{ $t("Your information is encrypted by SSL") }}</small>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="col-sm-12 col-md-4">
      <div class="card card-custom shadow-sm">
        <div class="card-body p-5">
          <div
            class="alert alert-custom alert-notice alert-light-warning fade show m-0"
            role="alert"
          >
            <div class="alert-icon">
              <span
                class="svg-icon svg-icon-lg svg-icon-3x svg-icon-warning mr-3"
              >
                <!--begin::Svg Icon-->
                <inline-svg src="media/svg/icons/Navigation/Double-check.svg" />
                <!--end::Svg Icon-->
              </span>
            </div>
            <div class="alert-text text-justify font-weight-bold">
              {{
                $t(
                  "Once payment has been made, you can send your production instructions to your seller, discuss and exchange files in complete safety."
                )
              }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
#wallet {
  background-color: transparent !important;
  border-color: transparent !important;
}
#wallet.wallet-active {
  background-color: #f3f6f9 !important;
  border-color: #f3f6f9 !important;
}
</style>
<script>
import { SET_BREADCRUMB } from "@/core/services/store/modules/breadcrumbs.module";
import { SET_HEAD_TITLE } from "@/core/services/store/modules/htmlhead.module";
import { queryServiceOrderPreview } from "@/graphql/service-queries";
import { mapGetters } from "vuex";
import { initiateServicePurchase } from "@/graphql/purchase-mutations";
import { UPDATE_USER } from "@/core/services/store/modules/auth.module";
import { toastMixin } from "@/view/mixins";
import { RESET_PURCHASE_OPTIONS } from "@/core/services/store/modules/purchase.module";

export default {
  name: "service-order",
  mixins: [toastMixin],
  components: {},
  data() {
    return {
      serviceOrderPreview: {},
      btnClasses: ["btn", "btn-hover-bg-light"],
      serviceOptions: []
    };
  },
  mounted() {},
  beforeMount() {
    if (this.purchaseServiceOptions !== null) {
      this.serviceOptions = this.purchaseServiceOptions;
    }

    this.fetchServiceOrderPreview();
  },
  computed: {
    ...mapGetters([
      "basePrice",
      "currency",
      "currentAccount",
      "purchaseServiceOptions"
    ]),
    getClasses() {
      return this.btnClasses;
    },
    isBtnSelected() {
      return this.btnClasses.includes("wallet-active");
    },
    isBtnNotSelected() {
      return !this.isBtnSelected;
    },
    cannotProceedPayment() {
      return (
        this.isBtnNotSelected || this.serviceOrderPreview.cannotPayWithWallet
      );
    },
    hasOptions() {
      return this.serviceOptions.length > 0;
    },
    getTitle() {
      return (
        this.$t("Order for") + " " + this.serviceOrderPreview.service.title
      );
    }
  },
  methods: {
    toggleBtn() {
      if (this.isBtnSelected) {
        this.btnClasses.pop();
      } else {
        this.btnClasses.push("wallet-active");
      }
    },
    async fetchServiceOrderPreview() {
      const result = await this.$apollo.query({
        query: queryServiceOrderPreview,
        variables: {
          service: this.$route.params.id,
          serviceOptions: this.serviceOptions
        }
      });

      if (window._.isEmpty(result.errors)) {
        this.serviceOrderPreview = result.data.serviceOrderPreview;

        await this.$store.dispatch(SET_BREADCRUMB, [{ title: this.getTitle }]);
        await this.$store.dispatch(SET_HEAD_TITLE, this.getTitle);
      }
    },
    async initServicePurchase() {
      const btn = window.$("#proceed-btn");
      btn.attr("disabled", true);
      btn.addClass("spinner spinner-light spinner-right");

      this.errors = [];

      let result = await this.$apollo.mutate({
        mutation: initiateServicePurchase,
        variables: {
          input: {
            service: this.$route.params.id,
            serviceOptions: this.serviceOptions
          }
        }
      });

      btn.removeAttr("disabled");
      btn.removeClass("spinner spinner-light spinner-right");

      this.errors = result.data.initiateServicePurchase.errors;
      if (!window._.isEmpty(this.errors)) {
        return;
      }

      await this.$store.dispatch(RESET_PURCHASE_OPTIONS);

      await this.$store.dispatch(UPDATE_USER, {
        account: result.data.initiateServicePurchase.servicePurchase.account
      });

      await this.$router.push({
        name: "purchases-view",
        params: { id: result.data.initiateServicePurchase.servicePurchase.id }
      });

      this.notifySuccess(
        this.$t("You successfully make a purchase of ") +
          this.serviceOrderPreview.service.title
      );
    }
  }
};
</script>
