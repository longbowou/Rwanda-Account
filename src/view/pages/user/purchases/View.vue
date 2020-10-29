<template>
  <div>
    <!--begin::Dashboard-->
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div
          class="card card-custom shadow-sm mb-5"
          v-if="servicePurchase.initiated"
        >
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
                  <inline-svg src="media/svg/icons/Code/Warning-1-circle.svg" />
                  <!--end::Svg Icon-->
                </span>
              </div>
              <div class="alert-text text-justify font-weight-bold">
                Your purchase <strong>{{ servicePurchase.number }}</strong> has
                been successfully placed to the seller
                <strong>{{
                  servicePurchase.service
                    ? servicePurchase.service.account.fullName
                    : null
                }}</strong
                >. <br />
                You must wait for the seller to <strong>accept</strong> the
                order to continue the process of purchasing the service. <br />
                You can <strong>cancel</strong> the purchase before the order is
                accepted by the seller. <br />
              </div>
            </div>
          </div>
        </div>

        <!--begin::Card-->
        <div class="card card-custom gutter-b shadow-sm">
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
                Purchase
              </h3>
              <span
                class="label label-xl font-weight-bold label-inline label-square label-light-dark"
              >
                {{ servicePurchase.number }}
              </span>

              <span
                :class="[
                  'ml-3 label label-xl font-weight-bold label-inline label-square',
                  servicePurchase.initiated && 'label-dark',
                  servicePurchase.accepted && 'label-primary',
                  servicePurchase.delivered && 'label-warning',
                  servicePurchase.approved && 'label-success',
                  servicePurchase.inDispute && 'label-info',
                  servicePurchase.canceled && 'label-danger'
                ]"
              >
                {{ servicePurchase.status }}
              </span>

              <i
                v-if="servicePurchase.approved"
                class="ml-2 icon-lg text-success flaticon2-correct"
              />
            </div>
            <div class="card-toolbar">
              <button
                ref="btnCancel"
                @click="handleCancelPurchase"
                v-if="servicePurchase.canBeCanceled"
                title="Cancel"
                class="btn btn-lg btn-icon btn-light-danger mr-2"
              >
                <i class="flaticon2-cancel"></i>
              </button>

              <button
                ref="btnApprove"
                @click="handleApprovePurchase"
                v-if="servicePurchase.canBeApproved"
                title="Approve"
                class="btn btn-lg btn-icon btn-light-success mr-2"
              >
                <i class="fas fa-check-double"></i>
              </button>

              <a
                v-if="servicePurchase.hasBeenAccepted"
                href="javascript:void(0);"
                title="Chat with the Seller"
                class="btn btn-lg btn-icon btn-light-primary"
              >
                <i class="flaticon2-chat-1"></i>
              </a>
            </div>
          </div>

          <div class="card-body pb-3">
            <div class="row mb-2">
              <h3 class="col-sm-9 text-primary font-weight-bold">
                {{
                  servicePurchase.service ? servicePurchase.service.title : null
                }}
              </h3>
              <h3 class="col-sm-3 text-primary font-weight-bold text-right">
                {{ basePrice }} {{ currency }}
              </h3>
            </div>

            <div v-if="hasOptions">
              <div class="row justify-content-center mb-3">
                <div class="col-10">
                  <hr />
                </div>
              </div>

              <template v-for="serviceOption of servicePurchase.serviceOptions">
                <div :key="serviceOption.id" class="row mb-2">
                  <h6 class="col-sm-9 font-weight-bold">
                    {{ serviceOption.label }}<br />
                    <small>{{ serviceOption.delayPreviewDisplay }}</small>
                  </h6>
                  <h5 class="col-sm-3 font-weight-bold text-right">
                    {{ serviceOption.price }} {{ currency }}
                  </h5>
                  <div class="col-10">
                    <hr />
                  </div>
                </div>
              </template>

              <p class="text-muted">
                {{ servicePurchase.delay }}
              </p>
            </div>

            <hr />

            <div class="row">
              <h6 class="col-sm-9 font-weight-bold">
                TOTAL
              </h6>
              <div class="col-sm-3 text-right">
                <h5 class="font-weight-bold">
                  {{ servicePurchase.price }} {{ currency }}
                </h5>
                <p class="font-weight-boldest text-success mb-0">
                  Paid with Wallet <br />
                  <i class="ml-2 icon-lg text-success flaticon2-correct" />
                </p>
              </div>
            </div>
          </div>

          <div class="card-footer pt-4 pb-4" v-if="servicePurchase.accepted">
            <h6 class="text-dark-65 m-0">
              Deadline
              <span class="text-primary">{{ servicePurchase.deadlineAt }}</span>
            </h6>
          </div>
        </div>
        <!--end::Card-->
        <router-view v-if="servicePurchase.hasBeenAccepted" />
      </div>

      <div class="col-sm-4">
        <div
          class="card card-custom shadow-sm mb-5"
          v-if="servicePurchase.accepted"
        >
          <div class="card-body p-5">
            <div
              class="alert alert-custom alert-notice alert-secondary fade show m-0"
              role="alert"
            >
              <div class="alert-icon">
                <span
                  class="svg-icon svg-icon-lg svg-icon-3x svg-icon-secondary mr-3"
                >
                  <!--begin::Svg Icon-->
                  <inline-svg src="media/svg/icons/Code/Info-circle.svg" />
                  <!--end::Svg Icon-->
                </span>
              </div>
              <div class="alert-text text-justify font-weight-bold">
                The seller has accepted your purchase a delivery deadline has
                been set to
                <strong>{{ servicePurchase.deadlineAt }}</strong
                >. <br />
                <strong
                  >The seller will publish a deliverable in final version and
                  mark the order as delivered before the end of this
                  deadline.</strong
                >
              </div>
            </div>
          </div>
        </div>

        <timeline :timelines="timelines" />

        <user-card
          :user="
            servicePurchase.service ? servicePurchase.service.account : null
          "
        />
      </div>
    </div>
    <!--end::Dashboard-->
  </div>
</template>
<style>
.timeline-item:after {
  border-right: transparent !important;
}
.timeline-content {
  background-color: transparent !important;
}
</style>
<script>
import { SET_BREADCRUMB } from "@/core/services/store/modules/breadcrumbs.module";
import { SET_HEAD_TITLE } from "@/core/services/store/modules/htmlhead.module";
import { mapGetters } from "vuex";
import { purchaseActionsMixin, toastMixin } from "@/view/mixins";
import { queryServicePurchase } from "@/graphql/purchase-queries";
import UserCard from "@/view/pages/partials/UserCard";
import Timeline from "@/view/pages/user/purchases/Timeline";
import { queryServicePurchaseTimeline } from "@/graphql/service-purchase-queries";

export default {
  name: "PurchaseView",
  mixins: [toastMixin, purchaseActionsMixin],
  components: { UserCard, Timeline },
  data() {
    return {
      servicePurchase: {},
      timelines: {}
    };
  },
  computed: {
    ...mapGetters(["currentAccount", "currency", "basePrice"]),
    getTitle() {
      if (this.servicePurchase.number !== undefined) {
        return "Purchase " + this.servicePurchase.number;
      }

      return "";
    },
    hasOptions() {
      if (this.servicePurchase.serviceOptions) {
        return this.servicePurchase.serviceOptions.length > 0;
      }
      return false;
    }
  },
  mounted() {},
  beforeMount() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.fetchPurchase();
      this.fetchTimeline();
    },
    async fetchPurchase() {
      const result = await this.$apollo.query({
        query: queryServicePurchase,
        variables: {
          id: this.$route.params.id
        }
      });

      if (window._.isEmpty(result.errors)) {
        this.servicePurchase = result.data.servicePurchase;

        await this.$store.dispatch(SET_BREADCRUMB, [{ title: this.getTitle }]);
        await this.$store.dispatch(SET_HEAD_TITLE, this.getTitle);
      }
    },
    async fetchTimeline() {
      const result = await this.$apollo.query({
        query: queryServicePurchaseTimeline,
        variables: {
          id: this.$route.params.id
        }
      });

      if (window._.isEmpty(result.errors)) {
        this.timelines = result.data.servicePurchase.timelines;
      }
    },
    async handleCancelPurchase() {
      const title =
        "Do you really want to cancel the purchase " +
        this.servicePurchase.number +
        " for " +
        this.servicePurchase.service.title +
        " ?";

      window.$(this.$refs.btnCancel).removeClass("btn-light-danger");
      window
        .$(this.$refs.btnCancel)
        .addClass("btn-light disabled spinner spinner-danger spinner-right");
      window
        .$(this.$refs.btnCancel)
        .find("i")
        .css("display", "none");

      const result = await this.cancelPurchase(
        this.servicePurchase.id,
        title,
        true
      );

      if (window._.isObject(result)) {
        this.servicePurchase = result.servicePurchase;
        await this.fetchTimeline();
      } else {
        this.$refs.btnCancel.blur();
      }

      window.$(this.$refs.btnCancel).addClass("btn-light-danger");
      window
        .$(this.$refs.btnCancel)
        .removeClass("btn-light disabled spinner spinner-danger spinner-right");
      window
        .$(this.$refs.btnCancel)
        .find("i")
        .css("display", "");
    },
    async handleApprovePurchase() {
      const title =
        "Do you really want to approve the purchase " +
        this.servicePurchase.number +
        " for " +
        this.servicePurchase.service.title +
        " ?";

      window.$(this.$refs.btnApprove).removeClass("btn-light-success");
      window
        .$(this.$refs.btnApprove)
        .addClass("btn-light disabled spinner spinner-success spinner-right");
      window
        .$(this.$refs.btnApprove)
        .find("i")
        .css("display", "none");

      const result = await this.approvePurchase(
        this.servicePurchase.id,
        title,
        true
      );

      if (window._.isObject(result)) {
        this.servicePurchase = result.servicePurchase;
        await this.fetchTimeline();
      } else {
        this.$refs.btnApprove.blur();
      }

      window.$(this.$refs.btnApprove).addClass("btn-light-success");
      window
        .$(this.$refs.btnApprove)
        .removeClass(
          "btn-light disabled spinner spinner-success spinner-right"
        );
      window
        .$(this.$refs.btnApprove)
        .find("i")
        .css("display", "");
    }
  }
};
</script>
