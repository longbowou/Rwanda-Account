<template>
  <div class="card card-custom card-sticky">
    <div class="card-header">
      <div class="card-title">
        <span class="svg-icon svg-icon-lg svg-icon-3x svg-icon-primary mr-3">
          <!--begin::Svg Icon-->
          <inline-svg src="media/svg/icons/Files/Compilation.svg" />
          <!--end::Svg Icon-->
        </span>
        <h3 class="card-label">
          {{ getTitle }}
        </h3>
      </div>
      <div class="card-toolbar">
        <button
          @click="routeToOrderView"
          class="btn btn-light-primary font-weight-bolder mr-2"
        >
          <i class="ki ki-long-arrow-back icon-xs"></i>
          Back
        </button>
      </div>
    </div>
    <div class="card-body pt-3">
      <div class="row justify-content-center">
        <div class="col-sm-12" v-html="deliverable.description"></div>
        <div class="col-sm-12">
          <hr />
          <h5 class="text-center">Uploaded Files</h5>
          <deliverable-files />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { SET_BREADCRUMB } from "@/core/services/store/modules/breadcrumbs.module";
// import { SET_HEAD_TITLE } from "@/core/services/store/modules/htmlhead.module";
import { queryDeliverable } from "@/graphql/deliverable-queries";
import DeliverableFiles from "@/view/pages/user/orders/deliverables/files/Datatable";

export default {
  name: "DeliverableCreate",
  components: { DeliverableFiles },
  data() {
    return {
      deliverable: {}
    };
  },
  computed: {
    getTitle() {
      return this.deliverable.title;
    }
  },
  mounted() {
    // this.$store.dispatch(SET_BREADCRUMB, [{ title: this.getTitle }]);
    // this.$store.dispatch(SET_HEAD_TITLE, this.getTitle);
  },
  beforeMount() {
    this.fetchDeliverable();
  },
  methods: {
    routeToOrderView() {
      this.$router.push({
        name: "orders-view",
        params: {
          id: this.$route.params.id
        }
      });
    },
    async fetchDeliverable() {
      let result = await this.$apollo.query({
        query: queryDeliverable,
        variables: {
          id: this.$route.params.deliverableId
        },
        fetchPolicy: "no-cache"
      });

      if (window._.isEmpty(result.errors)) {
        this.deliverable = result.data.deliverable;
      }
    }
  }
};
</script>
