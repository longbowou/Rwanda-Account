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
              <h3 class="card-label">Add a Service</h3>
            </div>
          </div>
          <div class="card-body">
            <div class="row justify-content-center">
              <service-form />
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
import { formMixin, toastMixin } from "@/view/mixins";
import "select2";
import ServiceForm from "@/view/pages/user/services/ServiceForm";

export default {
  name: "ServicesCreate",
  components: { ServiceForm },
  mixins: [formMixin, toastMixin],
  data() {
    return {};
  },
  computed: {},
  mounted() {
    this.$store.dispatch(SET_BREADCRUMB, [{ title: "Add a Service" }]);
    this.$store.dispatch(SET_HEAD_TITLE, "Add a Service");
  },
  methods: {}
};
</script>
