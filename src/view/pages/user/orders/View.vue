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

              <a
                href="javascript:void(0);"
                title="Chat with the Seller"
                class="btn btn-lg btn-icon btn-light-primary"
              >
                <i class="flaticon2-chat-1"></i>
              </a>
            </div>
          </div>

          <div class="card-body">
            <div class="row mb-2">
              <h6 class="col-sm-9 font-weight-bold">
                {{ servicePurchase.service.title }}
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
        <div class="card card-custom shadow-sm mb-5">
          <div class="card-header">
            <div class="card-title">
              <span
                class="svg-icon svg-icon-lg svg-icon-3x svg-icon-primary mr-3"
              >
                <!--begin::Svg Icon-->
                <inline-svg src="media/svg/icons/General/Settings-1.svg" />
                <!--end::Svg Icon-->
              </span>

              <h3 class="card-label">
                Timeline
              </h3>
            </div>
          </div>
          <div class="card-body">
            <div class="timeline timeline-justified timeline-4">
              <div class="timeline-bar"></div>
              <div class="timeline-items pt-7 pb-2">
                <template
                  v-for="(timeline, index) of servicePurchase.timelines"
                >
                  <div :key="index" class="timeline-item">
                    <div class="timeline-badge" style="top: auto">
                      <div :class="['bg-' + timeline.color]"></div>
                    </div>

                    <div class="timeline-label mb-0 pt-1 pl-0">
                      <span
                        :class="['font-weight-bold', 'text-' + timeline.color]"
                        >{{ timeline.happenAt }}</span
                      >
                    </div>

                    <div class="timeline-content pl-0 pb-0 pr-0 pt-1">
                      <span
                        :class="[
                          'label label-xl font-weight-bold label-inline label-square',
                          'label-light-' + timeline.color
                        ]"
                      >
                        {{ timeline.status }}
                      </span>

                      <p
                        class="text-dark-50 mt-2 mb-0"
                        v-html="timeline.description"
                        v-if="timeline.description !== null"
                      ></p>
                    </div>
                  </div>
                </template>
              </div>
            </div>
          </div>
        </div>

        <user-card :user="servicePurchase.account" />
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
import UserCard from "@/view/pages/UserCard";

export default {
  name: "PurchasesView",
  mixins: [toastMixin, orderActionsMixin],
  components: { UserCard },
  data() {
    return {
      servicePurchase: {}
    };
  },
  computed: {
    ...mapGetters(["currentAccount", "currency", "basePrice"]),
    getTitle() {
      if (this.servicePurchase.number !== undefined) {
        return "Order " + this.servicePurchase.number;
      }

      return "";
    }
  },
  mounted() {
    window.scrollTo(0, 0);
  },
  beforeMount() {
    this.fetchOrder();
  },
  methods: {
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
    async handleAcceptOrder() {
      const title =
        "Do you really want to accept the order " +
        this.servicePurchase.number +
        " for " +
        this.servicePurchase.service.title +
        " ?";
      const result = await this.acceptOrder(
        this.servicePurchase.id,
        title,
        true
      );

      if (window._.isObject(result)) {
        this.servicePurchase = result.servicePurchase;
      } else {
        this.$refs.btnAccept.blur();
      }
    },
    async handleDeliverOrder() {
      const title =
        "Do you really want to mark as deliver the order " +
        this.servicePurchase.number +
        " for " +
        this.servicePurchase.service.title +
        " ?";
      const result = await this.deliverOrder(
        this.servicePurchase.id,
        title,
        true
      );

      if (window._.isObject(result)) {
        this.servicePurchase = result.servicePurchase;
      } else {
        this.$refs.btnDeliver.blur();
      }
    }
  }
};
</script>
