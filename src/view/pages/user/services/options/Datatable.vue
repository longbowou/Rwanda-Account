<template>
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
            <h3 class="card-label">
              {{ $t("Service Options") }}
            </h3>
          </div>
          <div class="card-toolbar">
            <button
              @click="$router.push({ name: 'user-services' })"
              class="btn btn-light-dark font-weight-bolder m-2"
            >
              <i class="ki ki-long-arrow-back icon-lg"></i>
              {{ $t("Back to Services") }}
            </button>

            <router-link
              :to="{ name: 'service-options-create' }"
              v-slot="{ href, navigate, isActive, isExactActive }"
            >
              <a
                :href="href"
                class="btn btn-primary font-weight-bolder m-2"
                @click="navigate"
              >
                <span class="svg-icon svg-icon-md">
                  <inline-svg src="media/svg/icons/Design/Flatten.svg" />
                </span>
                {{ $t("Add an Option") }}
              </a>
            </router-link>
          </div>
        </div>
        <div class="card-body">
          <div class="row justify-content-center">
            <div class="col-sm-12">
              <table
                class="table table-hover dataTable dtr-inline text-center"
                id="service-options-dataTable"
              >
                <thead>
                  <tr>
                    <th style="width: 25%">{{ $t("Title") }}</th>
                    <th>{{ $t("Delivery Delay") }}</th>
                    <th>{{ $t("Price") }}</th>
                    <th>{{ $t("Published") }}</th>
                    <th>{{ $t("Created At") }}</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tfoot>
                  <tr>
                    <th style="width: 25%">{{ $t("Title") }}</th>
                    <th>{{ $t("Delivery Delay") }}</th>
                    <th>{{ $t("Price") }}</th>
                    <th>{{ $t("Published") }}</th>
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
</template>
<style scoped lang="css">
@import "~@/assets/plugins/datatable/datatables.bundle.css";
</style>

<script>
import { SET_BREADCRUMB } from "@/core/services/store/modules/breadcrumbs.module";
import { SET_HEAD_TITLE } from "@/core/services/store/modules/htmlhead.module";
import "@/assets/plugins/datatable/datatables.bundle";
import { servicesOptionsUrl } from "@/core/server-side/urls";
import JwtService from "@/core/services/jwt.service";
import i18nService from "@/core/services/i18n.service";
import { toastMixin } from "@/view/mixins";
import { queryServiceBasicFields } from "@/graphql/service-queries";
import { deleteServiceOption } from "@/graphql/service-options-mutations";

export default {
  name: "ServiceOptions",
  mixins: [toastMixin],
  data() {
    return {
      datatable: {},
      service: {}
    };
  },
  computed: {
    getTitle() {
      if (this.service) {
        return this.service.title;
      }
      return null;
    }
  },
  beforeMount() {
    this.fetchService();
  },
  mounted() {
    this.datatable = window.$("#service-options-dataTable").DataTable({
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
              name: "service-options-view",
              params: { optionId: data.id }
            });
            const showBtn = `<a href="${
              showRouter.href
            }" class="btn btn-sm btn-clean btn-icon btn-hover-icon-dark btn-square btn-icon-sm" title="${$this.$t(
              "Show"
            )}"><i class="flaticon-eye"></i></a>`;

            const editRouter = $this.$router.resolve({
              name: "service-options-edit",
              params: { id: data.service, optionId: data.id }
            });
            const editBtn = `<a href="${
              editRouter.href
            }" class="btn btn-sm btn-clean btn-icon btn-icon-sm btn-hover-icon-success btn-square" title="${$this.$t(
              "Edit"
            )}"><i class="fa fa-edit"></i></a>`;

            const deleteBtn = `<button class="btn btn-sm btn-clean btn-icon btn-icon-sm btn-hover-icon-danger btn-square btn-delete" title="${$this.$t(
              "Delete"
            )}" data-id="${data.id}" data-label="${
              data.label
            }"><i class="fa fa-trash"></i></button>`;
            return showBtn + " " + editBtn + " " + deleteBtn;
          }
        }
      ],
      responsive: true,
      searching: true,
      processing: true,
      serverSide: true,
      stateSave: true,
      ajax: {
        url: servicesOptionsUrl.replace(":pk", this.$route.params.id),
        headers: {
          "Accept-Language": i18nService.getActiveLanguage(),
          Authorization: "JWT " + JwtService.getAuth().token
        }
      }
    });

    const $this = this;
    window
      .$("#service-options-dataTable")
      .on("click", ".btn-delete", function() {
        $this.deleteServiceOption(
          window.$(this)[0].dataset.id,
          window.$(this)[0].dataset.label,
          window.$(this)[0]
        );
      });
  },
  methods: {
    async deleteServiceOption(id, label, btn) {
      if (confirm("Do you really want to delete " + label + " ?")) {
        let result = await this.$apollo.mutate({
          mutation: deleteServiceOption,
          variables: {
            id: id
          }
        });

        window.$(btn).addClass("disabled spinner spinner-danger spinner-right");

        if (window._.isEmpty(result.data.deleteServiceOption.errors)) {
          this.notifySuccess(this.$t("Service Option deleted successfully."));
          this.datatable.ajax.reload(null, false);
        }

        window
          .$(btn)
          .removeClass("disabled spinner spinner-danger spinner-right");
      }
    },
    async fetchService() {
      let result = await this.$apollo.query({
        query: queryServiceBasicFields,
        variables: {
          id: this.$route.params.id
        },
        fetchPolicy: "no-cache"
      });

      if (window._.isEmpty(result.errors)) {
        this.service = result.data.service;

        this.$store.dispatch(SET_BREADCRUMB, [{ title: this.getTitle }]);
        this.$store.dispatch(SET_HEAD_TITLE, this.getTitle);
      }
    }
  }
};
</script>
