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
        <deliverable-form :deliverable-id="$route.params.idDeliverable" />
      </div>

      <div>
        <hr class="mt-5" />

        <div class="form-group row">
          <label class="col-lg-3 col-form-label text-lg-right"
            >Upload Files:</label
          >
          <div class="col-lg-9">
            <div class="dropzone dropzone-multi" id="kt_dropzone_5">
              <div class="dropzone-panel mb-lg-0 mb-2">
                <a
                  class="dropzone-select btn btn-light-primary font-weight-bold btn-sm"
                  >Attach files</a
                >
              </div>

              <div class="dropzone-items">
                <div class="dropzone-item" style="display:none">
                  <div class="dropzone-file">
                    <div
                      class="dropzone-filename"
                      title="some_image_file_name.jpg"
                    >
                      <span data-dz-name>some_image_file_name.jpg</span>
                      <strong>(<span data-dz-size>340kb</span>)</strong>
                    </div>
                    <div class="dropzone-error" data-dz-errormessage></div>
                  </div>
                  <div class="dropzone-progress">
                    <div class="progress">
                      <div
                        class="progress-bar bg-primary"
                        role="progressbar"
                        aria-valuemin="0"
                        aria-valuemax="100"
                        aria-valuenow="0"
                        data-dz-uploadprogress
                      ></div>
                    </div>
                  </div>
                  <div class="dropzone-toolbar">
                    <span class="dropzone-delete" data-dz-remove
                      ><i class="flaticon2-cross"></i
                    ></span>
                  </div>
                </div>
              </div>
            </div>
            <span class="form-text text-muted"
              >Max file size is <strong>1GB</strong> and max number of files is
              <strong>10</strong>.</span
            >
          </div>
        </div>
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
  name: "ServicesEdit",
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
    routeToOrderView() {
      this.$router.push({
        name: "orders-view",
        params: {
          id: this.$route.params.id
        }
      });
    }
  },
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
};
</script>
