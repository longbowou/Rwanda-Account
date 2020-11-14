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
              <h3 class="card-label">{{ $t("Purchases") }}</h3>
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
                      <th>{{ $t("Number") }}</th>
                      <th style="width: 25%">{{ $t("Service") }}</th>
                      <th>{{ $t("Status") }}</th>
                      <th>{{ $t("Delivery delay") }}</th>
                      <th>{{ $t("Price") }}</th>
                      <th>{{ $t("Deadline") }}</th>
                      <th>{{ $t("Created At") }}</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tfoot>
                    <tr>
                      <th>{{ $t("Number") }}</th>
                      <th style="width: 25%">{{ $t("Service") }}</th>
                      <th>{{ $t("Status") }}</th>
                      <th>{{ $t("Delivery delay") }}</th>
                      <th>{{ $t("Price") }}</th>
                      <th>{{ $t("Deadline") }}</th>
                      <th>{{ $t("Created At") }}</th>
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
import { servicePurchasesUrl } from "@/core/server-side/urls";
import JwtService from "@/core/services/jwt.service";
import i18nService from "@/core/services/i18n.service";

export default {
  name: "Purchases",
  data() {
    return {
      datatable: {},
      interval: null
    };
  },
  computed: {
    ...mapGetters(["currentAccount", "currency"])
  },
  mounted() {
    this.$store.dispatch(SET_BREADCRUMB, [{ title: this.$t("Purchases") }]);
    this.$store.dispatch(SET_HEAD_TITLE, this.$t("Purchases"));

    const $this = this;
    this.datatable = window.$("#service-purchases-dataTable").DataTable({
      lengthMenu: [
        [10, 50, 100, -1],
        [10, 50, 100, "All"]
      ],
      order: [[6, "desc"]],
      columnDefs: [
        {
          orderable: false,
          searchable: false,
          targets: [0],
          render: function(data) {
            const showRouter = $this.$router.resolve({
              name: "purchases-view",
              params: { id: data.id }
            });

            return `<a href="${showRouter.href}" class="" >${data.number}</a>`;
          }
        },
        {
          orderable: false,
          searchable: false,
          targets: [1]
        },
        {
          orderable: false,
          searchable: false,
          targets: [7],
          render: function(data) {
            const buttons = [];

            const showRouter = $this.$router.resolve({
              name: "purchases-view",
              params: { id: data.id }
            });

            const showBtn = `<a href="${showRouter.href}" data-toggle="tooltip" class="btn btn-sm btn-clean btn-icon btn-hover-icon-dark btn-square btn-icon-sm" title="Show"><i class="flaticon-eye"></i></a>`;
            buttons.push(showBtn);

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

    this.interval = setInterval(function() {
      $this.datatable.ajax.reload(null, false);
    }, 10000);
  },
  methods: {},
  beforeDestroy() {
    clearInterval(this.interval);
  }
};
</script>
