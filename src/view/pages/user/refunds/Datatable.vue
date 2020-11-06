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
                <inline-svg
                  src="media/svg/icons/Communication/Incoming-box.svg"
                />
                <!--end::Svg Icon-->
              </span>
              <h3 class="card-label">Refunds</h3>
            </div>
          </div>
          <div class="card-body">
            <div class="row justify-content-center">
              <div class="col-sm-12">
                <table
                  class="table table-hover dataTable dtr-inline text-center"
                  id="refunds-dataTable"
                >
                  <thead>
                    <tr>
                      <th>Amount</th>
                      <th>Status</th>
                      <th>Phone Number</th>
                      <th>Created At</th>
                    </tr>
                  </thead>
                  <tfoot>
                    <tr>
                      <th>Amount</th>
                      <th>Status</th>
                      <th>Phone Number</th>
                      <th>Created At</th>
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
import { refundsUrl } from "@/core/server-side/urls";
import JwtService from "@/core/services/jwt.service";
import i18nService from "@/core/services/i18n.service";

export default {
  name: "Refunds",
  computed: {
    ...mapGetters(["currentAccount", "currency"])
  },
  mounted() {
    this.$store.dispatch(SET_BREADCRUMB, [{ title: "Refunds" }]);
    this.$store.dispatch(SET_HEAD_TITLE, "Refunds");

    window.$("#refunds-dataTable").DataTable({
      lengthMenu: [
        [10, 50, 100, -1],
        [10, 50, 100, "All"]
      ],
      order: [[3, "desc"]],
      columnDefs: [],
      searching: true,
      processing: true,
      serverSide: true,
      stateSave: true,
      ajax: {
        url: refundsUrl,
        headers: {
          "Accept-Language": i18nService.getActiveLanguage(),
          Authorization: "JWT " + JwtService.getAuth().token
        }
      }
    });
  },
  methods: {}
};
</script>
