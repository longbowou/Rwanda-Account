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
              <h3 class="card-label">Declare a litigation</h3>
            </div>
            <div class="card-toolbar">
              <button
                @click="$router.push({ name: 'orders-view' })"
                class="btn btn-light-dark font-weight-bolder mr-2"
              >
                <i class="ki ki-long-arrow-back icon-lg"></i>
                Back
              </button>
            </div>
          </div>
          <div class="card-body">
            <div class="row justify-content-center">
              <litigation-form />
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
import LitigationForm from "@/view/pages/user/services/litigations/LitigationForm";

export default {
  name: "",
  components: { LitigationForm },
  data() {
    return {};
  },
  computed: {},
  mounted() {},
  methods: {}
};
</script>
