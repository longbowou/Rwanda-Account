<template>
  <div class="card card-custom">
    <div class="card-header">
      <div class="card-title">
        <span class="svg-icon svg-icon-lg svg-icon-3x svg-icon-primary mr-3">
          <!--begin::Svg Icon-->
          <inline-svg src="media/svg/icons/Files/Compilation.svg" />
          <!--end::Svg Icon-->
        </span>
        <h3 class="card-label">Deliverables</h3>
      </div>

      <div class="card-toolbar">
        <router-link
          v-if="canAddDeliverable"
          :to="{ name: 'order-deliverables-create' }"
          v-slot="{ href, navigate, isActive, isExactActive }"
        >
          <a
            :href="href"
            class="btn btn-primary font-weight-bolder"
            @click="navigate"
          >
            <span class="svg-icon svg-icon-md">
              <inline-svg src="media/svg/icons/Design/Flatten.svg" />
            </span>
            Add a Deliverable
          </a>
        </router-link>
      </div>
    </div>

    <div class="card-body">
      <div class="row justify-content-center">
        <div class="col-sm-12">
          <table
            class="table table-hover dataTable dtr-inline text-center"
            id="order-deliverables-dataTable"
          >
            <thead>
              <tr>
                <th>Title</th>
                <th>Version</th>
                <th>Files Count</th>
                <th>Published</th>
                <th>Created At</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tfoot>
              <tr>
                <th>Title</th>
                <th>Version</th>
                <th>Files Count</th>
                <th>Published</th>
                <th>Created At</th>
                <th>Actions</th>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="css">
@import "~@/assets/plugins/datatable/datatables.bundle.css";
</style>

<script>
import "@/assets/plugins/datatable/datatables.bundle";
import { deliverablesUrl } from "@/core/server-side/urls";
import JwtService from "@/core/services/jwt.service";
import i18nService from "@/core/services/i18n.service";
import { queryOrder } from "@/graphql/order-queries";
import { deleteDeliverable } from "@/graphql/deliverable-mutations";
import { toastMixin } from "@/view/mixins";

export default {
  name: "Deliverables",
  mixins: [toastMixin],
  data() {
    return {
      servicePurchase: {},
      datatable: {}
    };
  },
  computed: {
    canAddDeliverable() {
      return this.servicePurchase.canAddDeliverable;
    }
  },
  mounted() {
    const $this = this;
    this.datatable = window.$("#order-deliverables-dataTable").DataTable({
      lengthMenu: [
        [10, 50, 100, -1],
        [10, 50, 100, "All"]
      ],
      order: [[4, "desc"]],
      columnDefs: [
        {
          orderable: false,
          searchable: false,
          targets: [5],
          render: function(data) {
            const buttons = [];

            const showRouter = $this.$router.resolve({
              name: "order-deliverables-view",
              params: { id: data.service_purchase, deliverableId: data.id }
            });

            const showBtn = `<a href="${showRouter.href}" class="btn btn-sm btn-clean btn-icon btn-icon-sm btn-hover-icon-dark btn-square" title="Show"><i class="flaticon-eye"></i></a>`;
            buttons.push(showBtn);

            const editRouter = $this.$router.resolve({
              name: "order-deliverables-edit",
              params: { id: data.service_purchase, deliverableId: data.id }
            });

            const editBtn = `<a href="${editRouter.href}" class="btn btn-sm btn-clean btn-icon btn-hover-icon-success btn-square btn-icon-sm" title="Edit"><i class="fa fa-edit"></i></a>`;
            buttons.push(editBtn);

            const filesRouter = $this.$router.resolve({
              name: "order-deliverables-files",
              params: { id: data.service_purchase, deliverableId: data.id }
            });

            const filesBtn = `<a href="${filesRouter.href}" class="btn btn-sm btn-clean btn-icon btn-hover-icon-primary btn-square btn-icon-sm" title="Files"><i class="flaticon2-file"></i></a>`;
            buttons.push(filesBtn);

            const deleteBtn = `<button class="btn btn-sm btn-clean btn-icon btn-icon-sm btn-hover-icon-danger btn-square btn-delete" title="Delete" data-id="${data.id}" data-title="${data.title}"><i class="fa fa-trash"></i></button>`;
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
        url: deliverablesUrl.replace(":pk", this.$route.params.id),
        headers: {
          "Accept-Language": i18nService.getActiveLanguage(),
          Authorization: "JWT " + JwtService.getAuth().token
        }
      }
    });

    window
      .$("#order-deliverables-dataTable")
      .on("click", ".btn-delete", function() {
        $this.deleteDeliverable(window.$(this)[0]);
      });
  },
  beforeMount() {
    this.fetchOrder();
  },
  methods: {
    async deleteDeliverable(btn) {
      const title =
        "Do you really want to delete the deliverable " +
        btn.dataset.title +
        " ?";
      if (confirm(title)) {
        let result = await this.$apollo.mutate({
          mutation: deleteDeliverable,
          variables: {
            id: btn.dataset.id
          }
        });

        if (window._.isEmpty(result.data.deleteDeliverable.errors)) {
          this.notifySuccess("Deliverable deleted successfully.");
          this.datatable.ajax.reload(null, false);
          this.$emit("deliverables-updated");
        }
      } else {
        btn.blur();
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
  }
};
</script>
