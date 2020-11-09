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
            </div>
            <div class="card-toolbar">
              <button
                @click="$router.push({ name: 'service-options' })"
                class="btn btn-light-dark font-weight-bolder mr-2"
              >
                <i class="ki ki-long-arrow-back icon-lg"></i>
                {{ $t("Back to Options") }}
              </button>

              <button
                @click="
                  $router.push({
                    name: 'service-options-edit',
                    params: {
                      id: $route.params.id
                    }
                  })
                "
                class="btn btn-light-primary font-weight-bolder mr-2"
              >
                <i class="fa fa-edit icon-lg"></i>
                {{ $t("Edit") }}
              </button>
            </div>
          </div>
          <div class="card-body">
            <div class="row">
              <div class="col-sm-12">
                <div class="form-group row">
                  <label class="col-form-label col-4 text-lg-right text-left">
                    {{ $t("Delivery Delay") }}
                  </label>
                  <div class="col-8">
                    <span class="form-control-plaintext font-weight-bold">
                      {{ serviceOption.delay }}
                    </span>
                  </div>
                </div>

                <div class="form-group row">
                  <label class="col-form-label col-4 text-lg-right text-left">
                    {{ $t("Price") }}
                  </label>
                  <div class="col-8">
                    <span class="form-control-plaintext font-weight-bold">
                      {{ serviceOption.price }} {{ currency }}
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
  </div>
</template>

<script>
import { SET_BREADCRUMB } from "@/core/services/store/modules/breadcrumbs.module";
import { SET_HEAD_TITLE } from "@/core/services/store/modules/htmlhead.module";
import { queryServiceOption } from "@/graphql/service-options-queries";
import { mapGetters } from "vuex";

export default {
  name: "OptionView",
  data() {
    return {
      service: {},
      serviceOption: {}
    };
  },
  computed: {
    ...mapGetters(["currency"]),
    getTitle() {
      if (window._.has(this.serviceOption, "label")) {
        return this.serviceOption.label;
      }

      return "";
    }
  },
  mounted() {},
  beforeMount() {
    this.fetchServiceOption();
  },
  methods: {
    async fetchServiceOption() {
      let result = await this.$apollo.query({
        query: queryServiceOption,
        variables: {
          id: this.$route.params.optionId
        }
      });

      if (window._.isEmpty(result.errors)) {
        this.serviceOption = result.data.serviceOption;

        this.$store.dispatch(SET_BREADCRUMB, [{ title: this.getTitle }]);
        this.$store.dispatch(SET_HEAD_TITLE, this.getTitle);
      }
    }
  }
};
</script>
