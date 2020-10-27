<template>
  <div>
    <!--begin::Dashboard-->
    <div class="row justify-content-center">
      <div :class="mainDivClasses">
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
                <h5>Action Required</h5>
                New order <strong>{{ servicePurchase.number }}</strong> has been
                placed by <strong>{{ servicePurchase.account.fullName }}</strong
                >. <br />
                You must <strong>accept</strong> the order to continue the
                process of purchasing the service. <br />
                The buyer
                <strong>{{ servicePurchase.account.fullName }}</strong> during
                this time before you accept the order may at any time
                <strong>cancel</strong> the order. <br />
                By responding quickly you <strong>increase</strong> your
                response time.
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
                <inline-svg src="media/svg/icons/Shopping/Bag2.svg" />
                <!--end::Svg Icon-->
              </span>
              <h3 class="card-label">
                Order
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
                  servicePurchase.updateInitiated && 'label-dark',
                  servicePurchase.accepted && 'label-primary',
                  servicePurchase.updateAccepted && 'label-primary',
                  servicePurchase.delivered && 'label-warning',
                  servicePurchase.updateDelivered && 'label-warning',
                  servicePurchase.approved && 'label-success',
                  servicePurchase.inDispute && 'label-info',
                  servicePurchase.refused && 'label-danger',
                  servicePurchase.canceled && 'label-danger',
                  servicePurchase.updateRefused && 'label-danger'
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
                ref="btnAccept"
                @click="handleAcceptOrder"
                v-if="servicePurchase.canBeAccepted"
                title="Accept"
                class="btn btn-lg btn-icon btn-light-success mr-2"
              >
                <i class="fas fa-check"></i>
              </button>

              <button
                ref="btnDeliver"
                @click="handleDeliverOrder"
                v-if="servicePurchase.canBeDelivered"
                title="Mark as Delivered"
                class="btn btn-lg btn-icon btn-light-success mr-2"
              >
                <i class="fas fa-check-double"></i>
              </button>

              <button
                ref="btnAskUpdate"
                @click="showUpdateRequestComponent"
                v-if="updateRequest !== null && !viewUpdateRequestView"
                data-toggle="tooltip"
                title="Make an update request"
                class="btn btn-lg btn-icon btn-light-warning mr-2"
              >
                <i class="fas fa-retweet"></i>
              </button>

              <button
                v-if="servicePurchase.hasBeenAccepted && !viewChat"
                title="Chat with the Buyer"
                @click="showChatComponent"
                class="btn btn-lg btn-icon btn-light-primary mr-2"
              >
                <i class="flaticon2-chat-1"></i>
              </button>

              <button
                ref="btnChat"
                v-if="!viewTimeline"
                @click="showTimelineComponent"
                title="Timeline"
                class="btn btn-lg btn-icon btn-light-dark"
              >
                <i class="fas fa-history"></i>
              </button>
            </div>
          </div>

          <div class="card-body">
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
                <div
                  :key="serviceOption.id"
                  class="row mb-2 justify-content-center"
                >
                  <h6 class="col-sm-9 font-weight-bold">
                    {{ serviceOption.label }} <br />
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

            <div class="row mb-2">
              <h6 class="col-sm-9 font-weight-bold">
                TOTAL
              </h6>
              <div class="col-sm-3 text-right">
                <h5 class="font-weight-bold">
                  {{ servicePurchase.price }} {{ currency }}
                </h5>
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
        <router-view
          v-if="servicePurchase.hasBeenAccepted"
          v-on:deliverables-updated="fetchData"
        />
      </div>

      <div :class="sideDivClasses">
        <div v-if="viewTimeline">
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
                  By accepting the order a delivery deadline has been set to
                  <strong>{{ servicePurchase.deadlineAt }}</strong>
                  for the order. <br />
                  <strong
                    >You must publish a deliverable in final version and mark
                    the order as delivered before the end of this
                    deadline.</strong
                  >
                </div>
              </div>
            </div>
          </div>

          <timeline :timelines="timelines" />
        </div>

        <chat v-if="viewChat" />

        <update-request-view
          v-on:update-request-updated="updateRequestUpdated"
          v-if="viewUpdateRequestView"
          :update-request="updateRequest"
        />
      </div>
    </div>
    <!--end::Dashboard-->
  </div>
</template>
<style></style>
<script>
import { SET_BREADCRUMB } from "@/core/services/store/modules/breadcrumbs.module";
import { SET_HEAD_TITLE } from "@/core/services/store/modules/htmlhead.module";
import { mapGetters } from "vuex";
import { orderActionsMixin, toastMixin } from "@/view/mixins";
import { queryOrder } from "@/graphql/order-queries";
import Timeline from "@/view/pages/user/purchases/Timeline";
import { queryServicePurchaseTimeline } from "@/graphql/service-purchase-queries";
import Chat from "@/view/pages/user/chat/Chat";
import UpdateRequestView from "@/view/pages/user/update-requests/View";

export default {
  name: "OrderView",
  mixins: [toastMixin, orderActionsMixin],
  components: { Timeline, Chat, UpdateRequestView },
  data() {
    return {
      servicePurchase: {},
      timelines: {},
      viewTimeline: true,
      viewChat: false,
      viewUpdateRequestView: false,
      updateRequest: null
    };
  },
  computed: {
    ...mapGetters(["currentAccount", "currency", "basePrice"]),
    getTitle() {
      if (this.servicePurchase.number) {
        return "Order " + this.servicePurchase.number;
      }

      return "";
    },
    hasOptions() {
      if (this.servicePurchase.serviceOptions) {
        return this.servicePurchase.serviceOptions.length > 0;
      }
      return false;
    },
    mainDivClasses() {
      if (this.viewChat || this.viewUpdateRequestView) {
        return "col-sm-7";
      }

      return "col-sm-8";
    },
    sideDivClasses() {
      if (this.viewChat || this.viewUpdateRequestView) {
        return "col-sm-5";
      }

      return "col-sm-4";
    }
  },
  mounted() {},
  beforeMount() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.fetchOrder();
      this.fetchTimeline();
    },
    async fetchOrder() {
      const result = await this.$apollo.query({
        query: queryOrder,
        variables: {
          id: this.$route.params.id
        }
      });

      if (window._.isEmpty(result.errors)) {
        this.servicePurchase = result.data.servicePurchase;
        this.updateRequest = result.data.servicePurchase.updateRequest;

        if (this.updateRequest !== null) {
          this.showUpdateRequestComponent();
        } else {
          this.showTimelineComponent();
        }

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
    async handleAcceptOrder() {
      const title =
        "Do you really want to accept the order " +
        this.servicePurchase.number +
        " for " +
        this.servicePurchase.service.title +
        " ?";

      window.$(this.$refs.btnAccept).removeClass("btn-light-success");
      window
        .$(this.$refs.btnAccept)
        .addClass("btn-light disabled spinner spinner-success spinner-right");
      window
        .$(this.$refs.btnAccept)
        .find("i")
        .css("display", "none");

      const result = await this.acceptOrder(
        this.servicePurchase.id,
        title,
        true
      );
      if (window._.isObject(result)) {
        this.servicePurchase = result.servicePurchase;
        await this.fetchTimeline();
      } else {
        this.$refs.btnAccept.blur();
      }

      window.$(this.$refs.btnAccept).addClass("btn-light-success");
      window
        .$(this.$refs.btnAccept)
        .removeClass(
          "btn-light disabled spinner spinner-success spinner-right"
        );
      window
        .$(this.$refs.btnAccept)
        .find("i")
        .css("display", "");
    },
    async handleDeliverOrder() {
      const title =
        "Do you really want to mark as deliver the order " +
        this.servicePurchase.number +
        " for " +
        this.servicePurchase.service.title +
        " ?";

      window.$(this.$refs.btnDeliver).removeClass("btn-light-success");
      window
        .$(this.$refs.btnDeliver)
        .addClass("btn-light disabled spinner spinner-success spinner-right");
      window
        .$(this.$refs.btnDeliver)
        .find("i")
        .css("display", "none");

      const result = await this.deliverOrder(
        this.servicePurchase.id,
        title,
        true
      );

      if (window._.isObject(result)) {
        this.servicePurchase = result.servicePurchase;
        await this.fetchTimeline();
      } else {
        this.$refs.btnDeliver.blur();
      }

      window.$(this.$refs.btnDeliver).addClass("btn-light-success");
      window
        .$(this.$refs.btnDeliver)
        .removeClass(
          "btn-light disabled spinner spinner-success spinner-right"
        );
      window
        .$(this.$refs.btnDeliver)
        .find("i")
        .css("display", "");
    },
    updateRequestUpdated(updateRequest) {
      this.updateRequest = updateRequest;
      this.fetchData();
    },
    showChatComponent() {
      this.viewChat = true;
      this.viewUpdateRequestView = false;
      this.viewTimeline = false;
    },
    showUpdateRequestComponent() {
      this.viewUpdateRequestView = true;
      this.viewTimeline = false;
      this.viewChat = false;
    },
    showTimelineComponent() {
      this.viewTimeline = true;
      this.viewChat = false;
      this.viewUpdateRequestCreate = false;
      this.viewUpdateRequestView = false;

      if (this.$refs.btnChat !== undefined) {
        this.$refs.btnChat.blur();
      }
      if (this.$refs.btnAskUpdate !== undefined) {
        this.$refs.btnAskUpdate.blur();
      }
    }
  }
};
</script>
