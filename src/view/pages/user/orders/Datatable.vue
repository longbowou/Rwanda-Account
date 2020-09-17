<template>
  <div>
    <!--begin::Dashboard-->
    <div class="row justify-content-center">
      <div class="col-md-12">
        <!--begin::Card-->
        <div class="card card-custom gutter-b">
          <div class="card-header">
            <div class="card-title">
              <span
                class="svg-icon svg-icon-lg svg-icon-3x svg-icon-primary mr-3"
              >
                <!--begin::Svg Icon-->
                <inline-svg src="media/svg/icons/Shopping/Cart1.svg" />
                <!--end::Svg Icon-->
              </span>
              <h3 class="card-label">Orders</h3>
            </div>
          </div>

          <div class="card-body">
            <div class="row justify-content-center">
              <div class="col-sm-12">
                <table
                  class="table table-hover dataTable dtr-inline text-center"
                  id="service-orders-dataTable"
                >
                  <thead>
                    <tr>
                      <th style="width: 30%">Service</th>
                      <th>Status</th>
                      <th>Delay</th>
                      <th>Price</th>
                      <th>Must Be Delivered At</th>
                      <th>Created At</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tfoot>
                    <tr>
                      <th style="width: 30%">Service</th>
                      <th>Status</th>
                      <th>Delay</th>
                      <th>Price</th>
                      <th>Must Be Delivered At</th>
                      <th>Created At</th>
                      <th>Actions</th>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>
        </div>
        <!--end::Card-->
      </div>
    </div>
    <!--end::Dashboard-->
  </div>
</template>
<style scoped lang="css">
@import "~@/assets/plugins/datatable/datatables.bundle.css";
</style>

<script>
import { SET_BREADCRUMB } from "@/core/services/store/modules/breadcrumbs.module";
import { SET_HEAD_TITLE } from "@/core/services/store/modules/htmlhead.module";
import { mapGetters } from "vuex";
import "@/assets/plugins/datatable/datatables.bundle";
import { serviceOrdersUrl } from "@/core/datatables/urls";
import JwtService from "@/core/services/jwt.service";
import i18nService from "@/core/services/i18n.service";
import { acceptServicePurchase } from "@/graphql/purchase-mutations";
import { toast } from "@/view/mixins";

export default {
  name: "user-service-purchases",
  mixins: [toast],
  data() {
    return {
      datatable: {}
    };
  },
  computed: {
    ...mapGetters(["currentAccount", "currency"])
  },
  mounted() {
    this.$store.dispatch(SET_BREADCRUMB, [{ title: "Orders" }]);
    this.$store.dispatch(SET_HEAD_TITLE, "Orders");

    const $this = this;
    this.datatable = window.$("#service-orders-dataTable").DataTable({
      lengthMenu: [
        [10, 50, 100, -1],
        [10, 50, 100, "All"]
      ],
      order: [[5, "desc"]],
      columnDefs: [
        {
          orderable: false,
          searchable: false,
          targets: [0]
        },
        {
          orderable: false,
          searchable: false,
          targets: [6],
          render: function(data) {
            const buttons = [];

            const showRouter = $this.$router.resolve({
              name: "service-detail",
              params: { id: data.id }
            });

            const showBtn = `<a href="${showRouter.href}" class="btn btn-sm btn-clean btn-icon btn-icon-sm" title="Show"><i class="flaticon-eye"></i></a>`;
            buttons.push(showBtn);

            if (data.can_be_accepted) {
              const acceptBtn = `<button class="btn btn-sm btn-clean btn-icon btn-icon-sm btn-accept" title="Accept" data-id="${data.id}" data-title="${data.service_title}"><i class="fas fa-check"></i></button>`;
              buttons.push(acceptBtn);
            }

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
        url: serviceOrdersUrl,
        headers: {
          "Accept-Language": i18nService.getActiveLanguage(),
          Authorization: "JWT " + JwtService.getAuth().token
        }
      }
    });

    window
      .$("#service-orders-dataTable")
      .on("click", ".btn-accept", function() {
        $this.acceptOrder(
          window.$(this)[0].dataset.id,
          window.$(this)[0].dataset.title
        );
      });
  },
  methods: {
    async acceptOrder(id, title) {
      if (confirm("Do you really want to accept order for " + title + " ?")) {
        let result = await this.$apollo.mutate({
          mutation: acceptServicePurchase,
          variables: {
            input: { id: id }
          }
        });

        if (window._.isEmpty(result.data.acceptServicePurchase.errors)) {
          this.notifySuccess("Purchase accepted successfully.");
          this.datatable.ajax.reload(null, false);
        }
      }
    }
  }
};
</script>
