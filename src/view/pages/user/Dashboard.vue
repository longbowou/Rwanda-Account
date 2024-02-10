<template>
  <div>
    <!--begin::Dashboard-->
    <div class="row justify-content-center">
      <div class="col-xxl-4">
        <!--begin::Stats Widget 29-->
        <div
            class="card card-custom bgi-no-repeat card-stretch gutter-b"
            style="background-position: right top; background-size: 30% auto; background-image: url(media/svg/shapes/abstract-1.svg)"
        >
          <!--begin::Body-->
          <div class="card-body">
            <span class="svg-icon svg-icon-4x svg-icon-dark">
              <inline-svg src="media/svg/icons/Shopping/Credit-card.svg"/>
            </span>
            <span
                class="card-title font-weight-bolder text-dark-75 font-size-h2 mb-0 mt-6 d-block"
            >
              {{ currentAccount !== null ? currentAccount.balance : null }}
              {{ currency }}
            </span>
            <span class="font-weight-bold text-muted  font-size-sm">
              {{ $t("Wallet Balance") }}
            </span>
          </div>
          <!--end::Body-->
        </div>
      </div>

      <div class="col-xxl-4">
        <router-link :to="{ name: 'orders' }">
          <div
              class="card card-custom bgi-no-repeat card-stretch gutter-b"
              style="background-position: right top; background-size: 30% auto; background-image: url(media/svg/shapes/abstract-3.svg)"
          >
            <!--begin::Body-->
            <div class="card-body">
            <span class="svg-icon svg-icon-4x svg-icon-dark">
              <inline-svg src="media/svg/icons/Shopping/Bag2.svg"/>
            </span>
              <span
                  class="card-title font-weight-bolder text-dark-75 font-size-h2 mb-0 mt-6 d-block"
              >{{
                  currentAccount !== null ? currentAccount.ordersCount : null
                }}</span
              >
              <span class="font-weight-bold text-muted  font-size-sm">
              {{ $t("Orders") }}
            </span>
            </div>
            <!--end::Body-->
          </div>
        </router-link>
      </div>

      <div class="col-xxl-4">
        <router-link :to="{ name: 'orders' }">
          <div
              class="card card-custom bgi-no-repeat card-stretch gutter-b"
              style="background-position: right top; background-size: 30% auto; background-image: url(media/svg/shapes/abstract-4.svg)"
          >
            <!--begin::Body-->
            <div class="card-body">
            <span class="svg-icon svg-icon-4x svg-icon-dark">
              <inline-svg src="media/svg/icons/General/Smile.svg"/>
            </span>
              <span
                  class="card-title font-weight-bolder text-dark-75 font-size-h2 mb-0 mt-6 d-block"
              >{{
                  currentAccount !== null ? currentAccount.earningsSum : null
                }}
              {{ currency }}</span
              >
              <span class="font-weight-bold text-muted  font-size-sm">
              {{ $t("Earnings") }}
            </span>
            </div>
            <!--end::Body-->
          </div>
        </router-link>
      </div>

      <div class="col-xxl-4">
        <router-link :to="{ name: 'purchases' }">
          <div
              class="card card-custom bgi-no-repeat card-stretch gutter-b"
              style="background-position: right top; background-size: 30% auto; background-image: url(media/svg/shapes/abstract-4.svg)"
          >
            <!--begin::Body-->
            <div class="card-body">
            <span class="svg-icon svg-icon-4x svg-icon-dark">
              <inline-svg src="media/svg/icons/Shopping/Cart1.svg"/>
            </span>
              <span
                  class="card-title font-weight-bolder text-dark-75 font-size-h2 mb-0 mt-6 d-block"
              >{{
                  currentAccount !== null ? currentAccount.purchasesCount : null
                }}</span
              >
              <span class="font-weight-bold text-muted  font-size-sm">
              {{ $t("Purchases") }}
            </span>
            </div>
            <!--end::Body-->
          </div>
        </router-link>
      </div>

      <div class="col-xxl-4">
        <router-link :to="{ name: 'deposits' }">
          <div
              class="card card-custom bgi-no-repeat card-stretch gutter-b"
              style="background-position: right top; background-size: 30% auto; background-image: url(media/svg/shapes/abstract-3.svg)"
          >
            <!--begin::Body-->
            <div class="card-body">
            <span class="svg-icon svg-icon-4x svg-icon-dark">
              <inline-svg
                  src="media/svg/icons/Communication/Incoming-box.svg"
              />
            </span>
              <span
                  class="card-title font-weight-bolder text-dark-75 font-size-h2 mb-0 mt-6 d-block"
              >{{
                  currentAccount !== null ? currentAccount.depositsSum : null
                }}
              {{ currency }}</span
              >
              <span class="font-weight-bold text-muted  font-size-sm">
              {{ $t("Deposits") }}
            </span>
            </div>
            <!--end::Body-->
          </div>
        </router-link>
      </div>

      <div class="col-xxl-4">
        <router-link :to="{ name: 'refunds' }">
          <div
              class="card card-custom bgi-no-repeat card-stretch gutter-b"
              style="background-position: right top; background-size: 30% auto; background-image: url(media/svg/shapes/abstract-1.svg)"
          >
            <!--begin::Body-->
            <div class="card-body">
            <span class="svg-icon svg-icon-4x svg-icon-dark">
              <inline-svg
                  src="media/svg/icons/Communication/Outgoing-box.svg"
              />
            </span>
              <span
                  class="card-title font-weight-bolder text-dark-75 font-size-h2 mb-0 mt-6 d-block"
              >{{ currentAccount !== null ? currentAccount.refundsSum : null }}
              {{ currency }}</span
              >
              <span class="font-weight-bold text-muted  font-size-sm">
              {{ $t("Refunds") }}
            </span>
            </div>
            <!--end::Body-->
          </div>
        </router-link>
      </div>

      <div class="col-xxl-4">
        <router-link :to="{ name: 'user-services' }">
          <div
              class="card card-custom bgi-no-repeat card-stretch gutter-b"
              style="background-position: right top; background-size: 30% auto; background-image: url(media/svg/shapes/abstract-3.svg)"
          >
            <!--begin::Body-->
            <div class="card-body">
            <span class="svg-icon svg-icon-4x svg-icon-dark">
              <inline-svg src="media/svg/icons/Shopping/Box2.svg"/>
            </span>
              <span
                  class="card-title font-weight-bolder text-dark-75 font-size-h2 mb-0 mt-6 d-block"
              >{{
                  currentAccount !== null ? currentAccount.servicesCount : null
                }}</span
              >
              <span class="font-weight-bold text-muted  font-size-sm">
              {{ $t("Services") }}
            </span>
            </div>
            <!--end::Body-->
          </div>
        </router-link>
      </div>
    </div>
    <!--end::Dashboard-->
  </div>
</template>

<script>
import {SET_BREADCRUMB} from "@/core/services/store/modules/breadcrumbs.module";
import {SET_HEAD_TITLE} from "@/core/services/store/modules/htmlhead.module";
import {mapGetters} from "vuex";
import {fetchAccount} from "@/core/services/store/modules/auth.module";

export default {
  name: "dashboard",
  computed: {
    ...mapGetters(["currentAccount", "currency"])
  },
  mounted() {
    this.$store.dispatch(SET_BREADCRUMB, [{title: this.$t("Dashboard")}]);
    this.$store.dispatch(SET_HEAD_TITLE, this.$t("Dashboard"));

    fetchAccount();
  },
  methods: {}
};
</script>
