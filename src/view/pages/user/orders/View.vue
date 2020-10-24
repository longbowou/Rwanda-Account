<template>
  <div>
    <!--begin::Dashboard-->
    <div class="row justify-content-center">
      <div :class="[isNotChatting && 'col-sm-8', isChatting && 'col-sm-7']">
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
                v-if="servicePurchase.hasBeenAccepted && isNotChatting"
                title="Chat with the Buyer"
                @click="toggleChattingStat"
                class="btn btn-lg btn-icon btn-light-primary"
              >
                <i class="flaticon2-chat-1"></i>
              </button>

              <button
                id="btn-chat"
                v-if="isChatting"
                @click="toggleChattingStat"
                title="Timeline"
                class="btn btn-light-dark font-weight-bolder"
              >
                <i class="flaticon2-time p-0"></i>
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

      <div :class="[isNotChatting && 'col-sm-4', isChatting && 'col-sm-5']">
        <div v-if="isNotChatting">
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

          <user-card :user="servicePurchase.account" />
        </div>

        <chat v-if="isChatting" />
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
import { orderActionsMixin, toastMixin } from "@/view/mixins";
import { queryOrder } from "@/graphql/order-queries";
import UserCard from "@/view/pages/partials/UserCard";
import Timeline from "@/view/pages/user/purchases/Timeline";
import { queryServicePurchaseTimeline } from "@/graphql/service-purchase-queries";
import Chat from "@/view/pages/user/chat/Chat";

export default {
  name: "OrderView",
  mixins: [toastMixin, orderActionsMixin],
  components: { UserCard, Timeline, Chat },
  data() {
    return {
      servicePurchase: {},
      timelines: {},
      chatting: false
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
    isChatting() {
      return this.chatting;
    },
    isNotChatting() {
      return !this.isChatting;
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
    toggleChattingStat() {
      if (this.isChatting) {
        window.$("#btn-chat").blur();
      }
      this.chatting = !this.chatting;
    }
  }
};
</script>
