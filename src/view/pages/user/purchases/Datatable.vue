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
              <h3 class="card-label">Purchases</h3>
            </div>
          </div>

          <div class="card-body">
            <div class="row justify-content-center">
              <div class="col-sm-12">
                <table
                  class="table table-hover dataTable dtr-inline text-center"
                  id="service-purchases-dataTable"
                >
                  <thead>
                    <tr>
                      <th style="width: 30%">Service</th>
                      <th>Status</th>
                      <th>Delay</th>
                      <th>Price</th>
                      <th>Deadline</th>
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
                      <th>Deadline</th>
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
import { servicePurchasesUrl } from "@/core/datatables/urls";
import JwtService from "@/core/services/jwt.service";
import i18nService from "@/core/services/i18n.service";
import { purchaseActionsMixin } from "@/view/mixins";

export default {
  name: "Purchases",
  mixins: [purchaseActionsMixin],
  data() {
    return {
      datatable: {}
    };
  },
  computed: {
    ...mapGetters(["currentAccount", "currency"])
  },
  mounted() {
    this.$store.dispatch(SET_BREADCRUMB, [{ title: "Purchases" }]);
    this.$store.dispatch(SET_HEAD_TITLE, "Purchases");

    const $this = this;
    this.datatable = window.$("#service-purchases-dataTable").DataTable({
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
              name: "purchases-view",
              params: { id: data.id }
            });

            const showBtn = `<a href="${showRouter.href}" class="btn btn-sm btn-clean btn-icon btn-hover-icon-dark btn-square btn-icon-sm" title="Show"><i class="flaticon-eye"></i></a>`;
            buttons.push(showBtn);

            const chatRouter = $this.$router.resolve({
              name: "purchases-view",
              params: { id: data.id }
            });

            const chatBtn = `<a href="${chatRouter.href}" class="btn btn-sm btn-clean btn-icon btn-hover-icon-primary btn-square btn-icon-sm" title="Show"><i class="flaticon2-chat-1"></i></a>`;
            buttons.push(chatBtn);

            if (data.can_be_canceled) {
              const cancelBtn = `<button class="btn btn-sm btn-clean btn-icon btn-hover-icon-danger btn-icon-sm btn-square btn-cancel" title="Cancel" data-id="${data.id}" data-title="${data.service_title}"><i class="flaticon2-cancel"></i></button>`;
              buttons.push(cancelBtn);
            }

            if (data.can_be_approved) {
              const approveBtn = `<button class="btn btn-sm btn-clean btn-icon btn-icon-sm btn-square btn-hover-icon-success btn-approve" title="Approve" data-id="${data.id}" data-title="${data.service_title}"><i class="fas fa-check-double"></i></button>`;
              buttons.push(approveBtn);
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
        url: servicePurchasesUrl,
        headers: {
          "Accept-Language": i18nService.getActiveLanguage(),
          Authorization: "JWT " + JwtService.getAuth().token
        }
      }
    });

    window
      .$("#service-purchases-dataTable")
      .on("click", ".btn-cancel", function() {
        $this.handleCancelPurchase(
          window.$(this)[0].dataset.id,
          window.$(this)[0].dataset.title,
          window.$(this)[0]
        );
      });

    window
      .$("#service-purchases-dataTable")
      .on("click", ".btn-approve", function() {
        $this.handleApprovePurchase(
          window.$(this)[0].dataset.id,
          window.$(this)[0].dataset.title,
          window.$(this)[0]
        );
      });
  },
  methods: {
    async handleCancelPurchase(id, title, btn) {
      const result = await this.cancelPurchase(id, title);

      if (window._.isObject(result)) {
        this.datatable.ajax.reload(null, false);
      } else {
        btn.blur();
      }
    },
    async handleApprovePurchase(id, title, btn) {
      const result = await this.approvePurchase(id, title);

      if (window._.isObject(result)) {
        this.datatable.ajax.reload(null, false);
      } else {
        btn.blur();
      }
    }
  }
};
</script>
