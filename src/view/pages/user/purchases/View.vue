<template>
  <div>
    <!--begin::Dashboard-->
    <div class="row justify-content-center">
      <div class="col-md-8">
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
              <h6 class="col-sm-9 font-weight-bold">
                {{
                  servicePurchase.service ? servicePurchase.service.title : null
                }}
              </h6>
              <h5 class="col-sm-3 font-weight-bold text-right">
                {{ basePrice }} {{ currency }}
              </h5>
            </div>

            <template v-for="serviceOption of servicePurchase.serviceOptions">
              <div :key="serviceOption.id" class="row mb-2">
                <h6 class="col-sm-9 font-weight-bold">
                  {{ serviceOption.label }}
                </h6>
                <h5 class="col-sm-3 font-weight-bold text-right">
                  {{ serviceOption.price }} {{ currency }}
                </h5>
              </div>
            </template>

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
              <span class="text-primary">{{
                servicePurchase.mustBeDeliveredAt
              }}</span>
            </h6>
          </div>
        </div>
        <!--end::Card-->
        <router-view />
      </div>

      <div class="col-sm-4">
        <timeline :timelines="servicePurchase.timelines" />

        <user-card :user="servicePurchase.service.account" />
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

export default {
  name: "PurchaseView",
  mixins: [toastMixin, purchaseActionsMixin],
  components: { UserCard, Timeline },
  data() {
    return {
      servicePurchase: {}
    };
  },
  computed: {
    ...mapGetters(["currentAccount", "currency", "basePrice"]),
    getTitle() {
      if (this.servicePurchase.number !== undefined) {
        return "Purchase " + this.servicePurchase.number;
      }

      return "";
    }
  },
  mounted() {
    window.scrollTo(0, 0);
  },
  beforeMount() {
    this.fetchPurchase();
  },
  methods: {
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
    async handleCancelPurchase() {
      const title =
        "Do you really want to cancel the purchase " +
        this.servicePurchase.number +
        " for " +
        this.servicePurchase.service.title +
        " ?";
      const result = await this.cancelPurchase(
        this.servicePurchase.id,
        title,
        true
      );

      if (window._.isObject(result)) {
        this.servicePurchase = result.servicePurchase;
      } else {
        this.$refs.btnCancel.blur();
      }
    },
    async handleApprovePurchase() {
      const title =
        "Do you really want to approve the purchase " +
        this.servicePurchase.number +
        " for " +
        this.servicePurchase.service.title +
        " ?";
      const result = await this.approvePurchase(
        this.servicePurchase.id,
        title,
        true
      );

      if (window._.isObject(result)) {
        this.servicePurchase = result.servicePurchase;
      } else {
        this.$refs.btnApprove.blur();
      }
    }
  }
};
</script>
