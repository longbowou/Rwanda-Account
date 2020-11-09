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
                <div
                  v-html="
                    $t(
                      'Your purchase <strong>{number}</strong> has been successfully placed to the seller <strong>{username}</strong>.',
                      {
                        number: servicePurchase.number,
                        username: servicePurchase.service
                          ? servicePurchase.service.account.username
                          : null
                      }
                    )
                  "
                ></div>
                <br />
                <div
                  v-html="
                    $t(
                      'You must wait for the seller to <strong>accept</strong> the order to continue the process of purchasing the service.'
                    )
                  "
                ></div>
                <br />
                <div
                  v-html="
                    $t(
                      'You can <strong>cancel</strong> the purchase before the order is accepted by the seller.'
                    )
                  "
                ></div>
                <br />
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
                {{ $t("Purchase") }}
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
                ref="btnApprove"
                @click="handleApprovePurchase"
                v-if="servicePurchase.canBeApproved"
                data-toggle="tooltip"
                :title="$t('Approve')"
                class="btn btn-lg btn-icon btn-light-success mr-2"
              >
                <i class="fas fa-check-double"></i>
              </button>

              <button
                ref="btnCancel"
                @click="handleCancelPurchase"
                v-if="servicePurchase.canBeCanceled"
                data-toggle="tooltip"
                :title="$t('Cancel')"
                class="btn btn-lg btn-icon btn-light-danger mr-2"
              >
                <i class="flaticon2-cancel"></i>
              </button>

              <button
                ref="btnAskUpdate"
                @click="showUpdateRequestComponent"
                v-if="
                  (servicePurchase.canAskForUpdate || updateRequest !== null) &&
                    !viewUpdateRequestCreate &&
                    !viewUpdateRequestView
                "
                data-toggle="tooltip"
                :title="
                  updateRequest == null
                    ? $t('Make an update request')
                    : $t('View update request')
                "
                class="btn btn-lg btn-icon btn-light-warning mr-2"
              >
                <i class="fas fa-retweet"></i>
              </button>

              <button
                ref="btnPutInDispute"
                @click="showLitigationComponent"
                v-if="
                  (servicePurchase.canBeInDispute || litigation !== null) &&
                    !viewLitigationCreate &&
                    !viewLitigationView
                "
                :title="
                  litigation == null
                    ? $t('Open a litigation')
                    : $t('View litigation')
                "
                class="btn btn-lg btn-icon btn-light-danger mr-2"
              >
                <span class="svg-icon svg-icon-lg svg-icon-2x">
                  <!--begin::Svg Icon-->
                  <inline-svg src="media/svg/icons/Code/Github.svg" />
                  <!--end::Svg Icon-->
                </span>
              </button>

              <button
                ref="btnComment"
                @click="showCommentCreate"
                v-if="servicePurchase.canBeCommented && !viewCommentCreate"
                :title="$t('Write a comment')"
                class="btn btn-lg btn-icon btn-light-dark mr-2"
              >
                <span class="svg-icon svg-icon-lg svg-icon-2x">
                  <!--begin::Svg Icon-->
                  <inline-svg src="media/svg/icons/Communication/Chat4.svg" />
                  <!--end::Svg Icon-->
                </span>
              </button>

              <button
                v-if="servicePurchase.hasBeenAccepted && !viewChat"
                @click="showChatComponent"
                data-toggle="tooltip"
                :title="$t('Chat with the Seller')"
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

          <div class="card-body pb-3">
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
                  {{ $t("Paid with Wallet") }} <br />
                  <i class="ml-2 icon-lg text-success flaticon2-correct" />
                </p>
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
        <!--        <router-view v-if="servicePurchase.hasBeenAccepted" />-->
      </div>

      <div :class="sideDivClasses">
        <div
          v-if="lastUpdateRequest !== null"
          :class="[
            'alert alert-custom alert-notice fade show m-0 mb-5',
            lastUpdateRequest.delivered && 'alert-light-warning',
            lastUpdateRequest.refused && 'alert-light-danger'
          ]"
          role="alert"
        >
          <div class="alert-icon">
            <span
              :class="[
                'svg-icon svg-icon-lg svg-icon-3x mr-3',
                lastUpdateRequest.delivered && 'svg-icon-warning',
                lastUpdateRequest.refused && 'svg-icon-danger'
              ]"
            >
              <!--begin::Svg Icon-->
              <inline-svg
                v-if="lastUpdateRequest.delivered"
                src="media/svg/icons/Code/Info-circle.svg"
              />

              <inline-svg
                v-if="lastUpdateRequest.refused"
                src="media/svg/icons/Code/Warning-1-circle.svg"
              />
              <!--end::Svg Icon-->
            </span>
          </div>
          <div class="alert-text text-justify font-weight-bold">
            <div v-if="lastUpdateRequest.delivered">
              <div
                v-html="
                  $t(
                    'Your update request <strong>{title}</strong> has been mark as delivered.',
                    { title: lastUpdateRequest.title }
                  )
                "
              ></div>
              <br />
            </div>

            <div v-if="lastUpdateRequest.refused">
              <div
                v-html="
                  $t(
                    'Your update request <strong>{title}</strong> has been refused.',
                    { title: lastUpdateRequest.title }
                  )
                "
              ></div>
              <br />
              <strong>{{ $t("Reason") }}:</strong>
              {{ lastUpdateRequest.reason }}
              <br />
            </div>

            <div
              v-html="
                $t(
                  'You can now <strong>approve, create a new update request or even open a litigation</strong> in order to continue the process of purchasing the service.'
                )
              "
            ></div>
          </div>
        </div>

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
              <div
                v-html="
                  $t('Your purchase has been approved by administrators.')
                "
              ></div>
              <br />
            </div>

            <div v-if="litigation.canceled">
              <div
                v-html="
                  $t('Your purchase has been canceled by administrators.')
                "
              ></div>
              <br />
            </div>

            <strong>{{ $t("Reason") }}: </strong> {{ litigation.reason }} <br />
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
                        'The seller has accepted your purchase a delivery deadline has been set to <strong>{deadlineAt}</strong>.',
                        { deadlineAt: servicePurchase.deadlineAt }
                      )
                    "
                  ></div>
                  <br />
                  <div
                    v-html="
                      $t(
                        '<strong>The seller will mark the order as delivered before the end of this deadline.</strong>'
                      )
                    "
                  ></div>
                </div>
              </div>
            </div>
          </div>

          <timeline :timelines="timelines" />
        </div>

        <chat
          v-if="viewChat"
          :service-purchase="servicePurchase"
          :from-purchase="true"
        />

        <update-request-create
          v-on:update-request-created="updateRequestCreated"
          v-if="viewUpdateRequestCreate"
        />

        <update-request-view
          :from-purchase="true"
          v-if="viewUpdateRequestView && updateRequest !== null"
          :update-request="updateRequest"
        />

        <litigation-create
          v-on:litigation-created="updateLitigationCreated"
          v-if="viewLitigationCreate"
        />

        <litigation-view
          :litigation="litigation"
          v-if="viewLitigationView && litigation !== null"
        />

        <comment-create
          v-on:comment-created="commentCreated"
          :service="servicePurchase.service"
          v-if="viewCommentCreate"
        />
      </div>
    </div>
    <!--end::Dashboard-->
  </div>
</template>

<script>
import { SET_BREADCRUMB } from "@/core/services/store/modules/breadcrumbs.module";
import { SET_HEAD_TITLE } from "@/core/services/store/modules/htmlhead.module";
import { mapGetters } from "vuex";
import { purchaseActionsMixin, toastMixin } from "@/view/mixins";
import { queryServicePurchase } from "@/graphql/purchase-queries";
import Timeline from "@/view/pages/user/purchases/Timeline";
import { queryServicePurchaseTimeline } from "@/graphql/service-purchase-queries";
import Chat from "@/view/pages/user/chat/Chat";
import UpdateRequestCreate from "@/view/pages/user/update-requests/Create";
import UpdateRequestView from "@/view/pages/user/update-requests/View";
import LitigationCreate from "@/view/pages/user/litigation/Create";
import LitigationView from "@/view/pages/user/litigation/View";
import CommentCreate from "@/view/pages/user/comments/Create";
import { purchaseSubscription } from "@/graphql/purchase-subscriptions";

export default {
  name: "PurchaseView",
  mixins: [toastMixin, purchaseActionsMixin],
  components: {
    Timeline,
    Chat,
    UpdateRequestCreate,
    UpdateRequestView,
    LitigationCreate,
    LitigationView,
    CommentCreate
  },
  data() {
    return {
      servicePurchase: {},
      timelines: {},
      viewTimeline: true,
      viewChat: false,
      viewUpdateRequestCreate: false,
      viewUpdateRequestView: false,
      viewLitigationCreate: false,
      viewLitigationView: false,
      viewCommentCreate: false,
      updateRequest: null,
      lastUpdateRequest: null,
      litigation: null
    };
  },
  computed: {
    ...mapGetters(["currentAccount", "currency"]),
    getTitle() {
      if (this.servicePurchase.number !== undefined) {
        return this.$t("Purchase") + " " + this.servicePurchase.number;
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
        this.viewUpdateRequestCreate ||
        this.viewUpdateRequestView ||
        this.viewLitigationCreate ||
        this.viewLitigationView ||
        this.viewCommentCreate
      ) {
        return "col-sm-7";
      }

      return "col-sm-8";
    },
    sideDivClasses() {
      if (
        this.viewChat ||
        this.viewUpdateRequestCreate ||
        this.viewUpdateRequestView ||
        this.viewLitigationCreate ||
        this.viewLitigationView ||
        this.viewCommentCreate
      ) {
        return "col-sm-5";
      }

      return "col-sm-4";
    }
  },
  mounted() {},
  beforeMount() {
    this.fetchData();
    this.subscribeToPurchase();
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
    async handleCancelPurchase() {
      const title = this.$t(
        "Do you really want to cancel the purchase {number} for {title} ?",
        {
          number: this.servicePurchase.number,
          title: this.servicePurchase.service.title
        }
      );

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
      const title = this.$t(
        "Do you really want to approve the purchase {number} for {title} ?",
        {
          number: this.servicePurchase.number,
          title: this.servicePurchase.service.title
        }
      );

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
    },
    subscribeToPurchase() {
      const observer = this.$apollo.subscribe({
        query: purchaseSubscription,
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
      this.lastUpdateRequest = servicePurchase.lastUpdateRequest;
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
    updateRequestCreated(updateRequest) {
      this.updateRequest = updateRequest;
      this.fetchData();
    },
    updateLitigationCreated(litigation) {
      this.litigation = litigation;
      this.fetchData();
    },
    commentCreated() {
      this.showTimelineComponent();
    },
    showChatComponent() {
      this.viewChat = true;
      this.viewUpdateRequestCreate = false;
      this.viewUpdateRequestView = false;
      this.viewTimeline = false;
      this.viewLitigationCreate = false;
      this.viewLitigationView = false;
      this.viewCommentCreate = false;
    },
    showUpdateRequestComponent() {
      if (this.updateRequest !== null) {
        this.viewUpdateRequestView = true;
        this.viewUpdateRequestCreate = false;
      } else {
        this.viewUpdateRequestCreate = true;
        this.viewUpdateRequestView = false;
      }
      this.viewTimeline = false;
      this.viewChat = false;
      this.viewLitigationCreate = false;
      this.viewLitigationView = false;
      this.viewCommentCreate = false;
    },
    showLitigationComponent() {
      if (this.litigation !== null) {
        this.viewLitigationView = true;
        this.viewLitigationCreate = false;
      } else {
        this.viewLitigationCreate = true;
        this.viewLitigationView = false;
      }
      this.viewTimeline = false;
      this.viewChat = false;
      this.viewUpdateRequestCreate = false;
      this.viewUpdateRequestView = false;
      this.viewCommentCreate = false;
    },
    showTimelineComponent() {
      this.viewTimeline = true;
      this.viewChat = false;
      this.viewUpdateRequestCreate = false;
      this.viewUpdateRequestView = false;
      this.viewLitigationCreate = false;
      this.viewLitigationView = false;
      this.viewCommentCreate = false;

      if (this.$refs.btnChat !== undefined) {
        this.$refs.btnChat.blur();
      }
      if (this.$refs.btnAskUpdate !== undefined) {
        this.$refs.btnAskUpdate.blur();
      }
    },
    showCommentCreate() {
      this.viewCommentCreate = true;
      this.viewChat = false;
      this.viewUpdateRequestCreate = false;
      this.viewUpdateRequestView = false;
      this.viewTimeline = false;
      this.viewLitigationCreate = false;
      this.viewLitigationView = false;
    }
  }
};
</script>
