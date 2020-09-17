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
                <p class="font-weight-boldest text-success">
                  Paid with Wallet <br />
                  <i class="ml-2 icon-lg text-success flaticon2-correct" />
                </p>
              </div>
            </div>
          </div>
        </div>
        <!--end::Card-->
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

        <div class="card card-custom shadow-sm">
          <div class="card-body p-5">
            <a href="#" class="d-flex align-items-start mb-5">
              <div class="symbol symbol-40 symbol-lg-50 symbol-circle bg-light">
                <img alt="Pic" src="media/stock-600x600/img-11.jpg" />
              </div>
              <span class="text-dark-75 font-weight-bold ml-2">{{
                servicePurchase.service.account.fullName
              }}</span>
            </a>

            <hr />

            <a
              href="#"
              class="btn btn-light btn-lg btn-square font-weight-bold pl-2 pr-2"
              style="width: 40%"
              >Contact</a
            >

            <a
              href="#"
              class="btn btn-light btn-lg btn-square font-weight-bold float-right pl-2 pr-2"
              style="width: 40%"
              >View Profile</a
            >
          </div>
        </div>
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

export default {
  name: "user-service-purchases-view",
  mixins: [toastMixin, purchaseActionsMixin],
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
  mounted() {},
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
      const result = await this.cancelPurchase(
        this.servicePurchase.id,
        this.servicePurchase.service.title,
        true
      );

      if (window._.isObject(result)) {
        this.servicePurchase = result.servicePurchase;
      } else {
        this.$refs.btnCancel.blur();
      }
    },
    async handleApprovePurchase() {
      const result = await this.approvePurchase(
        this.servicePurchase.id,
        this.servicePurchase.service.title,
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
