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
          @click="
            $router.push({
              name: 'purchases-view',
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
      <deliverable-files />
    </div>
  </div>
</template>

<script>
// import { SET_BREADCRUMB } from "@/core/services/store/modules/breadcrumbs.module";
// import { SET_HEAD_TITLE } from "@/core/services/store/modules/htmlhead.module";
import DeliverableFiles from "@/view/pages/user/purchases/deliverables/files/Datatable";
import { queryDeliverable } from "@/graphql/deliverable-queries";

export default {
  name: "DeliverableFilesRoot",
  components: { DeliverableFiles },
  data() {
    return {
      deliverable: {}
    };
  },
  computed: {
    getTitle() {
      if (window._.has(this.deliverable, "title")) {
        return this.deliverable.title + " Uploaded Files";
      }

      return "Deliverable";
    }
  },
  mounted() {
    // this.$store.dispatch(SET_BREADCRUMB, [{ title: this.getTitle }]);
    // this.$store.dispatch(SET_HEAD_TITLE, this.getTitle);
    this.initFileUpload();
  },
  beforeMount() {
    this.fetchDeliverable();
  },
  methods: {
    async fetchDeliverable() {
      let result = await this.$apollo.query({
        query: queryDeliverable,
        variables: {
          id: this.$route.params.deliverableId
        }
      });

      if (window._.isEmpty(result.errors)) {
        this.deliverable = result.data.deliverable;
      }
    }
  }
};
</script>
