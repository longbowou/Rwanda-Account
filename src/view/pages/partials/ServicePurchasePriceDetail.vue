<template>
  <div class="card card-custom shadow-sm mb-5">
    <div class="card-header">
      <div class="card-title">
        <span class="svg-icon svg-icon-lg svg-icon-3x svg-icon-primary mr-3">
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
      <h5 v-if="fromOrderPreview">{{ $t("Seller Payment") }}</h5>

      <h5 v-if="!fromOrderPreview">{{ $t("Your Payment") }}</h5>

      <div class="row mb-2">
        <p class="col-sm-9">
          {{ $t("Amount") }}
        </p>
        <p class="col-sm-3 font-weight-bold text-right">
          {{ totalPrice }} {{ currency }}
        </p>
      </div>

      <div class="row mb-2" v-if="fromOrderPreview">
        <p class="col-sm-9">
          TVA
        </p>
        <p class="col-sm-3 font-weight-bold text-right">
          {{ totalPriceTva }} {{ currency }}
        </p>
      </div>

      <hr />

      <h5>{{ $t("Fee") }}</h5>

      <div class="row mb-2">
        <p class="col-sm-9">
          {{ $t("MDTAF's Commission") }}
        </p>
        <p class="col-sm-3 font-weight-bold text-right">
          {{ commission }} {{ currency }}
        </p>
      </div>

      <div class="row mb-2" v-if="fromOrderPreview">
        <p class="col-sm-9">
          TVA 0 %
        </p>
        <p class="col-sm-3 font-weight-bold text-right">
          {{ commissionTva }} {{ currency }}
        </p>
      </div>

      <hr />

      <div class="row mb-2">
        <h5 class="col-sm-9">TOTAL</h5>
        <p class="col-sm-3 font-weight-bold text-right">
          {{ totalOrderPrice }} {{ currency }}
        </p>
      </div>

      <div class="row mb-2" v-if="fromOrderPreview">
        <h5 class="col-sm-9">TOTAL TTC</h5>

        <p class="col-sm-3 font-weight-bold text-right">
          {{ totalOrderPriceTtc }} {{ currency }}
        </p>
      </div>

      <hr />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "ServicePurchasePriceDetail",
  props: [
    "fromOrderPreview",
    "totalPrice",
    "totalPriceTva",
    "commission",
    "commissionTva",
    "totalOrderPrice",
    "totalOrderPriceTtc"
  ],
  computed: {
    ...mapGetters(["currency"])
  }
};
</script>

<style scoped></style>
