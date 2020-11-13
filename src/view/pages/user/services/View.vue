<template>
  <div>
    <!--begin::Dashboard-->
    <div class="row justify-content-center">
      <div class="col-md-12">
        <!--begin::Card-->
        <div class="card card-custom gutter-b">
          <div class="card-header">
            <div class="card-title">
              <span class="svg-icon svg-icon-lg svg-icon-3x svg-icon-primary">
                <!--begin::Svg Icon-->
                <inline-svg src="media/svg/icons/Shopping/Box2.svg" />
                <!--end::Svg Icon-->
              </span>
              <h3 class="card-label">{{ getTitle }}</h3>

              <span
                :class="[
                  'ml-3 label label-xl font-weight-bold label-inline label-square',
                  service.submittedForApproval && 'label-dark',
                  service.accepted && 'label-success',
                  service.rejected && 'label-warning'
                ]"
              >
                {{ service.status }}
              </span>
            </div>
            <div class="card-toolbar">
              <button
                ref="btnSubmitForApproval"
                @click="submitServiceForApproval"
                v-if="service.canBeSubmittedForApproval"
                :title="$t('Submit for approval')"
                class="btn btn-lg btn-icon btn-light-success m-2"
              >
                <i class="fas fa-check"></i>
              </button>

              <button
                @click="
                  $router.push({
                    name: 'user-services-edit',
                    params: {
                      id: $route.params.id
                    }
                  })
                "
                class="btn btn-light-primary font-weight-bolder m-2"
              >
                <i class="fa fa-edit icon-lg"></i>
                {{ $t("Edit") }}
              </button>

              <button
                @click="$router.push({ name: 'user-services' })"
                class="btn btn-light-dark font-weight-bolder m-2"
              >
                <i class="ki ki-long-arrow-back icon-lg"></i>
                {{ $t("Back to Services") }}
              </button>
            </div>
          </div>
          <div class="card-body">
            <div class="row">
              <div class="col-sm-8" v-html="service.content"></div>
              <div class="col-sm-4">
                <div
                  v-if="service.rejected"
                  class="alert alert-custom alert-notice alert-warning fade show m-0 mb-5"
                  role="alert"
                >
                  <div class="alert-icon">
                    <span
                      class="svg-icon svg-icon-lg svg-icon-3x svg-icon-white mr-3"
                    >
                      <!--begin::Svg Icon-->
                      <inline-svg src="media/svg/icons/Code/Info-circle.svg" />
                      <!--end::Svg Icon-->
                    </span>
                  </div>
                  <div class="alert-text text-justify font-weight-bold">
                    <strong>Reason :</strong> {{ service.rejectedReason }}<br />
                  </div>
                </div>

                <div class="form-group row">
                  <label class="col-form-label col-4 text-lg-right text-left">
                    {{ $t("Category") }}
                  </label>
                  <div class="col-8">
                    <span class="form-control-plaintext font-weight-bold">
                      {{
                        service.serviceCategory
                          ? service.serviceCategory.label
                          : null
                      }}
                    </span>
                  </div>
                </div>

                <div class="form-group row">
                  <label class="col-form-label col-4 text-lg-right text-left">
                    {{ $t("Delivery Delay") }}
                  </label>
                  <div class="col-8">
                    <span class="form-control-plaintext font-weight-bold">
                      {{ service.delayDisplay }}
                    </span>
                  </div>
                </div>

                <div class="form-group row">
                  <label class="col-form-label col-4 text-lg-right text-left">
                    {{ $t("Keywords") }}
                  </label>
                  <div class="col-8">
                    <span
                      class="form-control-plaintext font-weight-bold"
                      v-if="service.keywords"
                    >
                      <template
                        v-for="(keyword, index) of service.keywords.split(',')"
                      >
                        <span
                          :key="index"
                          class="ml-3 label label-xl font-weight-bold label-inline label-square mb-2"
                        >
                          {{ keyword }}
                        </span>
                      </template>
                    </span>
                  </div>
                </div>

                <div class="form-group row">
                  <label class="col-form-label col-4 text-lg-right text-left">
                    {{ $t("Published") }}
                  </label>
                  <div class="col-8">
                    <span class="form-control-plaintext font-weight-bold">{{
                      service.publishedDisplay
                    }}</span>
                  </div>
                </div>

                <div class="form-group row">
                  <label class="col-form-label col-4 text-lg-right text-left">
                    {{ $t("Created at") }}
                  </label>
                  <div class="col-8">
                    <span class="form-control-plaintext font-weight-bold">
                      {{ service.createdAt }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!--end::Card-->
      </div>
    </div>
    <!--end::Dashboard-->

    <service-options />
  </div>
</template>

<script>
import { SET_BREADCRUMB } from "@/core/services/store/modules/breadcrumbs.module";
import { SET_HEAD_TITLE } from "@/core/services/store/modules/htmlhead.module";
import { queryServiceForView } from "@/graphql/service-queries";
import ServiceOptions from "@/view/pages/user/services/options/Datatable";
import { submitServiceForApproval } from "@/graphql/service-mutations";

export default {
  name: "ServiceView",
  components: { ServiceOptions },
  comments: { ServiceOptions },
  data() {
    return {
      service: {}
    };
  },
  computed: {
    getTitle() {
      if (window._.has(this.service, "title")) {
        return this.service.title;
      }

      return "";
    }
  },
  mounted() {},
  beforeMount() {
    this.fetchService();
  },
  methods: {
    async fetchService() {
      let result = await this.$apollo.query({
        query: queryServiceForView,
        variables: {
          id: this.$route.params.id
        }
      });

      if (window._.isEmpty(result.errors)) {
        this.service = result.data.service;

        this.$store.dispatch(SET_BREADCRUMB, [
          { title: this.$t("My Services"), route: { name: "user-services" } },
          { title: this.getTitle }
        ]);
        this.$store.dispatch(SET_HEAD_TITLE, this.getTitle);
      }
    },
    async submitServiceForApproval() {
      const title = this.$t(
        "Do you really want to submit the service for approval {title} ?",
        {
          title: this.service.title
        }
      );

      if (!confirm(title)) {
        return;
      }

      window
        .$(this.$refs.btnSubmitForApproval)
        .removeClass("btn-light-success");
      window
        .$(this.$refs.btnSubmitForApproval)
        .addClass("btn-light disabled spinner spinner-success spinner-right");
      window.$(this.$refs.btnSubmitForApproval).attr("disabled", true);
      window
        .$(this.$refs.btnSubmitForApproval)
        .find("i")
        .css("display", "none");

      let result = await this.$apollo.mutate({
        mutation: submitServiceForApproval,
        variables: {
          input: { id: this.$route.params.id }
        }
      });

      window.$(this.$refs.btnSubmitForApproval).addClass("btn-light-success");
      window.$(this.$refs.btnSubmitForApproval).removeAttr("disabled");
      window
        .$(this.$refs.btnSubmitForApproval)
        .removeClass(
          "btn-light disabled spinner spinner-success spinner-right"
        );
      window
        .$(this.$refs.btnSubmitForApproval)
        .find("i")
        .css("display", "");

      if (!window._.isEmpty(result.data.submitServiceForApproval.errors)) {
        return;
      }

      this.service = result.data.submitServiceForApproval.service;

      this.notifySuccess(
        this.$t("The service has been submitted for approval.")
      );
    }
  }
};
</script>
