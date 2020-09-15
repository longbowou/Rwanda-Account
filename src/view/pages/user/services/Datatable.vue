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
                <inline-svg src="media/svg/icons/Shopping/Box2.svg" />
                <!--end::Svg Icon-->
              </span>
              <h3 class="card-label">My Services</h3>
            </div>
            <div class="card-toolbar">
              <router-link
                :to="{ name: 'user-services-create' }"
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
                  Add a Service
                </a>
              </router-link>
            </div>
          </div>
          <div class="card-body">
            <div class="row justify-content-center">
              <div class="col-sm-12">
                <table
                  class="table table-hover dataTable dtr-inline text-center"
                  id="services-dataTable"
                >
                  <thead>
                    <tr>
                      <th style="width: 30%">Title</th>
                      <th>Delay</th>
                      <th>Activated</th>
                      <th>Published</th>
                      <th>Created At</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tfoot>
                    <tr>
                      <th>Title</th>
                      <th>Delay</th>
                      <th>Activated</th>
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
import { servicesUrl } from "@/core/datatables/urls";
import JwtService from "@/core/services/jwt.service";
import i18nService from "@/core/services/i18n.service";
import { deleteService } from "@/graphql/service-mutations";
import _ from "lodash";
import { toast } from "@/view/mixins";

export default {
  name: "user-services",
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
    this.$store.dispatch(SET_BREADCRUMB, [{ title: "My Services" }]);
    this.$store.dispatch(SET_HEAD_TITLE, "My Services");

    this.datatable = window.$("#services-dataTable").DataTable({
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
            const showRouter = $this.$router.resolve({
              name: "service-detail",
              params: { id: data.id }
            });
            const showBtn = `<a href="${showRouter.href}" class="btn btn-sm btn-clean btn-icon btn-icon-sm" title="Show"><i class="flaticon-eye"></i></a>`;

            const editRouter = $this.$router.resolve({
              name: "user-services-edit",
              params: { id: data.id }
            });
            const editBtn = `<a href="${editRouter.href}" class="btn btn-sm btn-clean btn-icon btn-icon-sm" title="Edit"><i class="fa fa-edit"></i></a>`;

            const optionsRouter = $this.$router.resolve({
              name: "user-services-options",
              params: { id: data.id }
            });
            const optionsBtn = `<a href="${optionsRouter.href}" class="btn btn-sm btn-clean btn-icon btn-icon-sm" title="Options"><i class="flaticon2-layers"></i></a>`;

            const deleteBtn = `<button class="btn btn-sm btn-clean btn-icon btn-icon-sm btn-delete" title="Delete" data-id="${data.id}" data-title="${data.title}"><i class="fa fa-trash"></i></button>`;
            return showBtn + " " + editBtn + " " + optionsBtn + " " + deleteBtn;
          }
        }
      ],
      responsive: true,
      searching: true,
      processing: true,
      serverSide: true,
      stateSave: true,
      ajax: {
        url: servicesUrl,
        headers: {
          "Accept-Language": i18nService.getActiveLanguage(),
          Authorization: "JWT " + JwtService.getAuth().token
        }
      }
    });

    const $this = this;
    window.$("#services-dataTable").on("click", ".btn-delete", function() {
      $this.deleteService(
        window.$(this)[0].dataset.id,
        window.$(this)[0].dataset.title
      );
    });
  },
  methods: {
    async deleteService(id, title) {
      if (confirm("Do you really want to delete " + title + " ?")) {
        let result = await this.$apollo.mutate({
          mutation: deleteService,
          variables: {
            id: id
          }
        });

        if (_.isEmpty(result.data.deleteService.errors)) {
          this.notifySuccess("Service deleted successfully.");
          this.datatable.ajax.reload(null, false);
        }
      }
    }
  }
};
</script>
