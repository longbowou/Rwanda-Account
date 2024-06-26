<template>
  <div class="row justify-content-center">
    <div class="col-sm-12">
      <table
        class="table table-hover dataTable dtr-inline text-center"
        id="order-deliverable-files-dataTable"
      >
        <thead>
          <tr>
            <th>Name</th>
            <th>Size</th>
            <th>Created At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tfoot>
          <tr>
            <th>Name</th>
            <th>Size</th>
            <th>Created At</th>
            <th>Actions</th>
          </tr>
        </tfoot>
      </table>
    </div>
  </div>
</template>
<style scoped lang="css">
@import "~@/assets/plugins/datatable/datatables.bundle.css";
</style>

<script>
import "@/assets/plugins/datatable/datatables.bundle";
import { deliverableFilesUrl } from "@/core/server-side/urls";
import JwtService from "@/core/services/jwt.service";
import i18nService from "@/core/services/i18n.service";
import { deleteDeliverableFile } from "@/graphql/deliverable-mutations";
import { toastMixin } from "@/view/mixins";
import FileSaver from "file-saver";

export default {
  name: "DeliverableFiles",
  props: ["updateIndex"],
  mixins: [toastMixin],
  data() {
    return {
      datatable: {}
    };
  },
  computed: {},
  watch: {
    updateIndex: function() {
      this.datatable.ajax.reload(null, false);
    }
  },
  mounted() {
    const $this = this;
    this.datatable = window.$("#order-deliverable-files-dataTable").DataTable({
      lengthMenu: [
        [10, 50, 100, -1],
        [10, 50, 100, "All"]
      ],
      order: [[2, "desc"]],
      columnDefs: [
        {
          orderable: false,
          searchable: false,
          targets: [3],
          render: function(data) {
            const buttons = [];

            const downloadBtn = `<button id="download-btn-${data.id}" data-id="download-btn-${data.id}" class="btn btn-sm btn-clean btn-icon btn-icon-sm btn-hover-icon-success btn-square btn-download" title="Download" data-id="${data.id}" data-name="${data.name}" data-file="${data.file_url}"><i class="fas fa-file-download"></i></button>`;
            buttons.push(downloadBtn);

            const deleteBtn = `<button class="btn btn-sm btn-clean btn-icon btn-icon-sm btn-hover-icon-danger btn-square btn-delete" title="Delete" data-id="${data.id}" data-title="${data.name}"><i class="fa fa-trash"></i></button>`;
            buttons.push(deleteBtn);

            return buttons.join("");
          }
        }
      ],
      responsive: true,
      searching: true,
      processing: true,
      serverSide: true,
      stateSave: true,
      ajax: {
        url: deliverableFilesUrl.replace(
          ":pk",
          this.$route.params.deliverableId
        ),
        headers: {
          "Accept-Language": i18nService.getActiveLanguage(),
          Authorization: "JWT " + JwtService.getAuth().token
        }
      }
    });

    window
      .$("#order-deliverable-files-dataTable")
      .on("click", ".btn-delete", function() {
        $this.deleteDeliverableFile(window.$(this)[0]);
      });

    window
      .$("#order-deliverable-files-dataTable")
      .on("click", ".btn-download", function() {
        $this.downloadFile(window.$(this)[0]);
      });
  },
  beforeMount() {},
  methods: {
    async deleteDeliverableFile(btn) {
      const title =
        "Do you really want to delete the deliverable file " +
        btn.dataset.title +
        " ?";
      if (confirm(title)) {
        let result = await this.$apollo.mutate({
          mutation: deleteDeliverableFile,
          variables: {
            id: btn.dataset.id
          }
        });

        if (window._.isEmpty(result.data.deleteDeliverableFile.errors)) {
          this.notifySuccess("Deliverable File deleted successfully.");
          this.datatable.ajax.reload(null, false);
        }
      } else {
        btn.blur();
      }
    },
    downloadFile(btn) {
      FileSaver.saveAs(btn.dataset.file, btn.dataset.name);
      btn.blur();
    }
  }
};
</script>
