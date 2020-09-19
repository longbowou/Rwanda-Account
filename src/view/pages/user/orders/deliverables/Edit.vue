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
        <deliverable-form />
      </div>

      <hr class="mt-5" />

      <h5 class="text-center">Upload Files</h5>

      <div class="col-sm-12">
        <div class="dropzone dropzone-multi" id="file-upload-dropzone">
          <div class="dropzone-panel mb-lg-0 mb-2">
            <a
              class="dropzone-select btn btn-light-primary font-weight-bold btn-sm"
              >Attach files
            </a>
          </div>

          <div class="dropzone-items">
            <div class="dropzone-item" style="">
              <div class="dropzone-file">
                <div class="dropzone-filename" title="some_image_file_name.jpg">
                  <span data-dz-name class="mr-2"
                    >some_image_file_name.jpg</span
                  >
                  <strong>(<span data-dz-size>340kb</span>)</strong>
                  <div id="success-div" style="display: none">
                    <i class="ml-2 icon-lg text-success flaticon2-correct" />
                  </div>
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

      <hr />

      <h5 class="text-center">Uploaded Files</h5>

      <deliverable-files :update-index="updateIndex" />
    </div>
  </div>
</template>

<script>
// import { SET_BREADCRUMB } from "@/core/services/store/modules/breadcrumbs.module";
// import { SET_HEAD_TITLE } from "@/core/services/store/modules/htmlhead.module";
import DeliverableForm from "@/view/pages/user/orders/deliverables/DeliverableForm";
import { queryOrder } from "@/graphql/order-queries";
import Dropzone from "dropzone";
import { deliverablesUploadUrl } from "@/core/server-side/urls";
import JwtService from "@/core/services/jwt.service";
import DeliverableFiles from "@/view/pages/user/orders/deliverables/files/Datatable";

export default {
  name: "DeliverableEdit",
  components: { DeliverableForm, DeliverableFiles },
  data() {
    return {
      servicePurchase: {},
      updateIndex: 0
    };
  },
  computed: {},
  mounted() {
    // this.$store.dispatch(SET_BREADCRUMB, [{ title: "Update a Deliverable" }]);
    // this.$store.dispatch(SET_HEAD_TITLE, "Update a Deliverable");
    this.initFileUpload();
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
    },
    initFileUpload() {
      const $this = this;

      const id = "#file-upload-dropzone";
      // set the preview element template
      const previewNode = window.$(id + " .dropzone-item");
      previewNode.id = "";
      const previewTemplate = previewNode.parent(".dropzone-items").html();
      previewNode.remove();

      const myDropzone5 = new Dropzone(id, {
        // Make the whole body a dropzone
        url: deliverablesUploadUrl.replace(
          ":pk",
          this.$route.params.deliverableId
        ), // Set the url for your upload script location
        parallelUploads: 5,
        maxFilesize: 1024, // Max filesize in MB
        previewTemplate: previewTemplate,
        previewsContainer: id + " .dropzone-items", // Define the container to display the previews
        clickable: id + " .dropzone-select", // Define the element that should be used as click trigger to select files.
        headers: {
          Authorization: "JWT " + JwtService.getAuth().token,
          "Cache-Control": null,
          "X-Requested-With": null
        }
      });

      myDropzone5.on("addedfile", function() {
        // Hookup the start button
        window
          .$(document)
          .find(id + " .dropzone-item")
          .css("display", "");
      });

      // Update the total progress bar
      myDropzone5.on("totaluploadprogress", function(progress) {
        window.$(id + " .progress-bar").css("width", progress + "%");
      });

      myDropzone5.on("sending", function() {
        // Show the total progress bar when upload starts
        window.$(id + " .progress-bar").css("opacity", "1");
      });

      // Hide the total progress bar when nothing's uploading anymore
      myDropzone5.on("complete", function() {
        var thisProgressBar = id + " .dz-complete";
        setTimeout(function() {
          window
            .$(
              thisProgressBar +
                " .progress-bar, " +
                thisProgressBar +
                " .progress"
            )
            .css("opacity", "0");
          window
            .$(thisProgressBar)
            .find("#success-div")
            .css("display", "block");
        }, 300);

        $this.updateIndex++;
      });
    }
  }
};
</script>
