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
                <h5>{{ $t("Action Required") }}</h5>
                <div
                  v-html="
                    $t(
                      'New order <strong>{number}</strong> has been placed by <strong>{username}</strong>.',
                      {
                        number: servicePurchase.number,
                        username: servicePurchase.account.username
                      }
                    )
                  "
                ></div>
                <div
                  v-html="
                    $t(
                      'You must <strong>accept or decline</strong> the order to continue or cancel the process of purchasing the service.'
                    )
                  "
                ></div>
                <div
                  v-html="
                    $t(
                      'The buyer <strong>{username}</strong> during this time before you accept the order may at any time <strong>cancel</strong> the order.',
                      { username: servicePurchase.account.username }
                    )
                  "
                ></div>
                <div
                  v-html="
                    $t(
                      'By responding quickly you <strong>increase</strong> your response time.'
                    )
                  "
                ></div>
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
                {{ $t("Order") }}
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
                :title="$t('Accept')"
                class="btn btn-lg btn-icon btn-light-success mr-2"
              >
                <i class="fas fa-check"></i>
              </button>

              <button
                ref="btnDeliver"
                @click="handleDeliverOrder"
                v-if="servicePurchase.canBeDelivered"
                :title="$t('Mark as Delivered')"
                class="btn btn-lg btn-icon btn-light-success mr-2"
              >
                <i class="fas fa-check-double"></i>
              </button>

              <button
                ref="btnAskUpdate"
                @click="showUpdateRequestComponent"
                v-if="updateRequest !== null && !viewUpdateRequestView"
                data-toggle="tooltip"
                :title="$t('View update request')"
                class="btn btn-lg btn-icon btn-light-warning mr-2"
              >
                <i class="fas fa-retweet"></i>
              </button>

              <button
                ref="btnPutInDispute"
                @click="showLitigationComponent"
                v-if="litigation !== null && !viewLitigationView"
                :title="$t('View litigation')"
                class="btn btn-lg btn-icon btn-light-danger mr-2"
              >
                <span class="svg-icon svg-icon-lg svg-icon-2x">
                  <!--begin::Svg Icon-->
                  <inline-svg src="media/svg/icons/Code/Github.svg" />
                  <!--end::Svg Icon-->
                </span>
              </button>

              <button
                v-if="servicePurchase.hasBeenAccepted && !viewChat"
                :title="$t('Chat with the Buyer')"
                @click="showChatComponent"
                class="btn btn-lg btn-icon btn-light-primary mr-2"
              >
                <i class="flaticon2-chat-1"></i>
              </button>

              <button
                ref="btnChat"
                v-if="!viewTimeline"
                @click="showTimelineComponent"
                :title="$t('Timeline')"
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
                {{ servicePurchase.basePrice }} {{ currency }}
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
              {{ $t("Deadline") }}
              <span class="text-primary">{{ servicePurchase.deadlineAt }}</span>
            </h6>
          </div>
        </div>
        <!--end::Card-->
        <!--        <router-view-->
        <!--          v-if="servicePurchase.hasBeenAccepted"-->
        <!--          v-on:deliverables-updated="fetchData"-->
        <!--        />-->
      </div>

      <div :class="sideDivClasses">
        <div
          v-if="litigation !== null && litigation.handled"
          :class="[
            'alert alert-custom alert-notice fade show m-0 mb-5',
            litigation.approved && 'alert-light-success',
            litigation.canceled && 'alert-light-danger'
          ]"
          role="alert"
        >
          <div class="alert-icon">
            <span
              :class="[
                'svg-icon svg-icon-lg svg-icon-3x mr-3',
                litigation.approved && 'svg-icon-success',
                litigation.canceled && 'svg-icon-danger'
              ]"
            >
              <!--begin::Svg Icon-->
              <inline-svg
                v-if="litigation.approved"
                src="media/svg/icons/Code/Done-circle.svg"
              />

              <inline-svg
                v-if="litigation.canceled"
                src="media/svg/icons/Code/Error-circle.svg"
              />
              <!--end::Svg Icon-->
            </span>
          </div>
          <div class="alert-text text-justify font-weight-bold">
            <div v-if="litigation.approved">
              {{ $t("The order has been approved by administrators.") }}
            </div>

            <div v-if="litigation.canceled">
              {{ $t("The order has been canceled by administrators.") }}
            </div>

            <strong>{{ $t("Reason") }}: </strong> {{ litigation.reason }} <br />
          </div>
        </div>

        <div v-if="litigation == null">
          <div
            v-if="servicePurchase.approved || servicePurchase.canceled"
            :class="[
              'alert alert-custom alert-notice fade show m-0 mb-5',
              servicePurchase.approved && 'alert-light-success',
              servicePurchase.canceled && 'alert-light-danger'
            ]"
            role="alert"
          >
            <div class="alert-icon">
              <span
                :class="[
                  'svg-icon svg-icon-lg svg-icon-3x mr-3',
                  servicePurchase.approved && 'svg-icon-success',
                  servicePurchase.canceled && 'svg-icon-danger'
                ]"
              >
                <!--begin::Svg Icon-->
                <inline-svg
                  v-if="servicePurchase.approved"
                  src="media/svg/icons/Code/Info-circle.svg"
                />

                <inline-svg
                  v-if="servicePurchase.canceled"
                  src="media/svg/icons/Code/Warning-1-circle.svg"
                />
                <!--end::Svg Icon-->
              </span>
            </div>
            <div class="alert-text text-justify font-weight-bold">
              <div
                v-if="servicePurchase.approved"
                v-html="
                  $t(
                    'The order has been <strong>approved</strong> by the buyer.<br />Check out your wallet.'
                  )
                "
              ></div>

              <div
                v-if="servicePurchase.canceled"
                v-html="
                  $t(
                    'The order has been <strong>canceled</strong> by the buyer.'
                  )
                "
              ></div>
            </div>
          </div>
        </div>

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
                  <div
                    v-html="
                      $t(
                        'By accepting the order a delivery deadline has been set to <strong>{deadlineAt}</strong>for the order.',
                        { deadlineAt: servicePurchase.deadlineAt }
                      )
                    "
                  ></div>
                  <strong>
                    {{
                      $t(
                        "You must mark the order as delivered before the end of this deadline."
                      )
                    }}
                  </strong>
                </div>
              </div>
            </div>
          </div>

          <timeline :timelines="timelines" />
        </div>

        <chat :service-purchase="servicePurchase" v-if="viewChat" />

        <update-request-view
          v-on:update-request-updated="updateRequestUpdated"
          v-if="viewUpdateRequestView && updateRequest !== null"
          :update-request="updateRequest"
        />

        <litigation-view
          :litigation="litigation"
          v-if="viewLitigationView && litigation !== null"
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
import LitigationView from "@/view/pages/user/litigation/View";
import { orderSubscription } from "@/graphql/order-subscriptions";

export default {
  name: "OrderView",
  mixins: [toastMixin, orderActionsMixin],
  components: { Timeline, Chat, UpdateRequestView, LitigationView },
  data() {
    return {
      servicePurchase: {},
      timelines: {},
      viewTimeline: true,
      viewChat: false,
      viewUpdateRequestView: false,
      viewLitigationView: false,
      updateRequest: null,
      litigation: null
    };
  },
  computed: {
    ...mapGetters(["currentAccount", "currency"]),
    getTitle() {
      if (this.servicePurchase.number) {
        return this.$t("Order") + " " + this.servicePurchase.number;
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
      if (
        this.viewChat ||
        this.viewUpdateRequestView ||
        this.viewLitigationView
      ) {
        return "col-sm-7";
      }

      return "col-sm-8";
    },
    sideDivClasses() {
      if (
        this.viewChat ||
        this.viewUpdateRequestView ||
        this.viewLitigationView
      ) {
        return "col-sm-5";
      }

      return "col-sm-4";
    }
  },
  mounted() {},
  beforeMount() {
    this.fetchData();
    this.subscribeToOrder();
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
        this.updateUI(result.data.servicePurchase);

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
      const title = this.$t(
        "Do you really want to accept the order {number} for {title} ?",
        {
          number: this.servicePurchase.number,
          title: this.servicePurchase.service.title
        }
      );

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
      const title = this.$t(
        "Do you really want to mark as delivered the order {number} for {title} ?",
        {
          number: this.servicePurchase.number,
          title: this.servicePurchase.service.title
        }
      );

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
    subscribeToOrder() {
      const observer = this.$apollo.subscribe({
        query: orderSubscription,
        variables: {
          id: this.$route.params.id
        }
      });

      const $this = this;
      observer.subscribe({
        next(data) {
          if (data.data.servicePurchaseSubscription.servicePurchase !== null) {
            $this.updateUI(
              data.data.servicePurchaseSubscription.servicePurchase
            );
          }
        },
        error() {}
      });
    },
    updateUI(servicePurchase) {
      this.servicePurchase = servicePurchase;
      this.updateRequest = servicePurchase.updateRequest;
      this.litigation = servicePurchase.litigation;

      if (servicePurchase.timelines !== undefined) {
        this.timelines = servicePurchase.timelines;
      }

      if (this.updateRequest !== null || this.litigation !== null) {
        if (this.updateRequest !== null) {
          this.showUpdateRequestComponent();
        }

        if (this.litigation !== null) {
          this.showLitigationComponent();
        }
      } else {
        this.showTimelineComponent();
      }
    },
    updateRequestUpdated(updateRequest) {
      this.updateRequest = updateRequest;
      this.fetchData();
    },
    showChatComponent() {
      this.viewChat = true;
      this.viewUpdateRequestView = false;
      this.viewLitigationView = false;
      this.viewTimeline = false;
    },
    showUpdateRequestComponent() {
      this.viewUpdateRequestView = true;
      this.viewLitigationView = false;
      this.viewTimeline = false;
      this.viewChat = false;
    },
    showLitigationComponent() {
      this.viewLitigationView = true;
      this.viewUpdateRequestView = false;
      this.viewTimeline = false;
      this.viewChat = false;
    },
    showTimelineComponent() {
      this.viewTimeline = true;
      this.viewChat = false;
      this.viewUpdateRequestView = false;
      this.viewLitigationView = false;

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
