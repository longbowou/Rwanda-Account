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
          class="btn btn-light-dark font-weight-bolder mr-2"
        >
          <i class="ki ki-long-arrow-back icon-lg"></i>
          Back
        </button>
      </div>
    </div>
    <div class="card-body pt-3">
      <deliverable-files :update-index="updateIndex" />

      <hr />

      <h5 class="text-center">Upload New Files</h5>

      <div class="col-sm-12">
        <div class="dropzone dropzone-multi" id="file-upload-dropzone">
          <div class="dropzone-panel mb-lg-0 mb-2">
            <a
              class="dropzone-select btn btn-light-primary font-weight-bold btn-sm"
              >Attach files
            </a>
          </div>

          <div class="dropzone-items">
            <div class="dropzone-item" style="display: none">
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
    </div>
  </div>
</template>

<script>
// import { SET_BREADCRUMB } from "@/core/services/store/modules/breadcrumbs.module";
// import { SET_HEAD_TITLE } from "@/core/services/store/modules/htmlhead.module";
import DeliverableFiles from "@/view/pages/user/orders/deliverables/files/Datatable";
import Dropzone from "dropzone";
import JwtService from "@/core/services/jwt.service";
import { queryDeliverable } from "@/graphql/deliverable-queries";
import { deliverablesUploadUrl } from "@/core/server-side/urls";

export default {
  name: "DeliverableFilesRoot",
  components: { DeliverableFiles },
  data() {
    return {
      deliverable: {},
      updateIndex: 0
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
    },
    initFileUpload() {
      const $this = this;

      const id = "#file-upload-dropzone";
      // set the preview element template
      const previewNode = window.$(id + " .dropzone-item");
      previewNode.id = "";
      const previewTemplate = previewNode.parent(".dropzone-items").html();
      previewNode.remove();

      Dropzone.autoDiscover = false;
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
