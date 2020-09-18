<template>
  <div>
    <!--begin::Dashboard-->
    <div class="row justify-content-center">
      <div class="col-md-12">
        <!--begin::Card-->
        <div class="card card-custom gutter-b">
          <div class="card-header">
            <div class="card-title">
              <span class="svg-icon svg-icon-lg svg-icon-3x svg-icon-primary">
                <!--begin::Svg Icon-->
                <inline-svg src="media/svg/icons/Shopping/Box2.svg" />
                <!--end::Svg Icon-->
              </span>
              <h3 class="card-label">
                Add a Deliverable to Order {{ servicePurchase.number }}
              </h3>
            </div>
          </div>
          <div class="card-body">
            <div class="row justify-content-center">
              <deliverable-form :service-purchase="servicePurchase" />
            </div>
          </div>
        </div>
        <!--end::Card-->
      </div>
    </div>
    <!--end::Dashboard-->
  </div>
</template>

<script>
import { SET_BREADCRUMB } from "@/core/services/store/modules/breadcrumbs.module";
import { SET_HEAD_TITLE } from "@/core/services/store/modules/htmlhead.module";
import DeliverableForm from "@/view/pages/user/orders/deliverables/DeliverableForm";
import { queryServicePurchase } from "@/graphql/order-queries";

export default {
  name: "DeliverableCreate",
  components: { DeliverableForm },
  data() {
    return {
      servicePurchase: {}
    };
  },
  computed: {
    getTitle() {
      return "Add a Deliverable to Order " + this.servicePurchase.number;
    }
  },
  mounted() {},
  beforeMount() {
    this.fetchOrder();
  },
  methods: {
    async fetchOrder() {
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
    }
  }
};
</script>
