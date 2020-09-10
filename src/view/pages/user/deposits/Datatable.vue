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
              <h3 class="card-label">Deposits</h3>
            </div>
          </div>
          <div class="card-body">
            <div class="row justify-content-center">
              <div class="col-sm-12">
                <table
                  class="table table-hover dataTable dtr-inline text-center"
                  id="deposits-dataTable"
                >
                  <thead>
                    <tr>
                      <th>Amount</th>
                      <th>Created At</th>
                    </tr>
                  </thead>
                  <tfoot>
                    <tr>
                      <th>Amount</th>
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
import { depositsUrl } from "@/core/datatables/urls";
import JwtService from "@/core/services/jwt.service";

export default {
  name: "deposits-datable",
  computed: {
    ...mapGetters(["currentAccount", "currency"])
  },
  mounted() {
    this.$store.dispatch(SET_BREADCRUMB, [{ title: "Deposits" }]);
    this.$store.dispatch(SET_HEAD_TITLE, "Deposits");

    window.$("#deposits-dataTable").DataTable({
      lengthMenu: [
        [10, 50, 100, -1],
        [10, 50, 100, "All"]
      ],
      order: [[1, "desc"]],
      columnDefs: [],
      searching: true,
      processing: true,
      serverSide: true,
      stateSave: true,
      ajax: {
        url: depositsUrl,
        headers: {
          Authorization: "JWT " + JwtService.getAuth().token
        }
      }
    });
  },
  methods: {}
};
</script>
