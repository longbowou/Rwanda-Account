<template>
  <div class="card card-custom card-sticky">
    <div class="card-header">
      <div class="card-title">
        <span class="svg-icon svg-icon-lg svg-icon-3x svg-icon-primary mr-3">
          <!--begin::Svg Icon-->
          <inline-svg src="media/svg/icons/Files/Compilation.svg" />
          <!--end::Svg Icon-->
        </span>
        <h3 class="card-label">Update a Deliverable</h3>
      </div>
      <div class="card-toolbar">
        <button
          @click="
            $router.push({
              name: 'orders-view',
              params: {
                id: $route.params.id
              }
            })
          "
          class="btn btn-light-dark font-weight-bolder mr-2"
        >
          <i class="ki ki-long-arrow-back icon-lg"></i>
          Back
        </button>
      </div>
    </div>
    <div class="card-body pt-3">
      <div class="row justify-content-center">
        <deliverable-form
          v-on:deliverables-updated="$emit('deliverables-updated')"
        />
      </div>
    </div>
  </div>
</template>

<script>
// import { SET_BREADCRUMB } from "@/core/services/store/modules/breadcrumbs.module";
// import { SET_HEAD_TITLE } from "@/core/services/store/modules/htmlhead.module";
import DeliverableForm from "@/view/pages/user/orders/deliverables/DeliverableForm";
import { queryOrder } from "@/graphql/order-queries";

export default {
  name: "DeliverableEdit",
  components: { DeliverableForm },
  data() {
    return {
      servicePurchase: {}
    };
  },
  computed: {},
  mounted() {
    // this.$store.dispatch(SET_BREADCRUMB, [{ title: "Update a Deliverable" }]);
    // this.$store.dispatch(SET_HEAD_TITLE, "Update a Deliverable");
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
      }
    }
  }
};
</script>
