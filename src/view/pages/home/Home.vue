<template>
  <div>
    <div class="row">
      <div class="card col-sm-12 card-custom bgi-position-center">
        <div class="card-body p-0">
          <div
            class="wizard wizard-1"
            id="kt_wizard_v1"
            data-wizard-state="step-first"
            data-wizard-clickable="true"
          >
            <!--begin: Wizard Nav-->
            <div class="wizard-nav border-bottom">
              <div class="wizard-steps p-8 p-lg-10">
                <div class="wizard-step" data-wizard-type="step">
                  <div class="wizard-label">
                    <i class="wizard-icon flaticon2-shopping-cart-1"></i>
                    <h3 class="wizard-title">
                      1. Order a service from your choice to one of our vendors
                    </h3>
                  </div>
                  <i class="wizard-arrow flaticon2-next"></i>
                </div>

                <div class="wizard-step" data-wizard-type="step">
                  <div class="wizard-label">
                    <i class="wizard-icon flaticon2-chat-1"></i>
                    <h3 class="wizard-title">
                      2. Exchange by chat on the site up to safe delivery
                    </h3>
                  </div>
                  <i class="wizard-arrow flaticon2-next"></i>
                </div>

                <div class="wizard-step" data-wizard-type="step">
                  <div class="wizard-label">
                    <i class="wizard-icon flaticon2-open-box"></i>
                    <h3 class="wizard-title">3. Get your service delivered</h3>
                  </div>
                  <i class="wizard-arrow flaticon2-next"></i>
                </div>

                <div class="wizard-step" data-wizard-type="step">
                  <div class="wizard-label">
                    <i class="wizard-icon flaticon2-checkmark"></i>
                    <h3 class="wizard-title">
                      4. The seller is paid only after delivery of the service
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <h1 class="text-center mt-10 mb-5">Services for sale</h1>

    <div class="row justify-content-center">
      <template v-for="service in services">
        <div :key="service.id" class="col-sm-3">
          <b-card
            :title="service.title"
            img-src="media/books/img-72.jpg"
            img-alt="cover"
            img-top
            img-height="150"
            body-class="p-5"
            class="shadow-sm"
          >
            <a href="#" class="d-flex align-items-center mb-5">
              <div class="symbol symbol-40 symbol-lg-50 symbol-circle bg-light">
                <img alt="Pic" src="media/stock-600x600/img-11.jpg" />
              </div>
              <span class="text-muted font-weight-bold ml-3">by</span>
              <span class="text-dark-75 font-weight-bold ml-2">{{
                service.account.fullName
              }}</span>
            </a>

            <router-link
              to="/detail"
              v-slot="{ href, navigate, isActive, isExactActive }"
            >
              <a
                :href="href"
                class="btn btn-light btn-lg btn-block btn-square font-weight-bold"
                @click="navigate"
              >
                Add to Card
              </a>
            </router-link>
          </b-card>
        </div>
      </template>
    </div>
  </div>

  <!--end::Dashboard-->
</template>
<style lang="scss">
@import "~@/assets/sass/pages/wizard/wizard-1.scss";
.card-img-top {
  object-fit: none;
  object-position: center;
}
</style>

<script>
import { SET_BREADCRUMB } from "@/core/services/store/modules/breadcrumbs.module";
import { queryServices } from "@/graphql/home-queries";
import { SET_HEAD_TITLE } from "@/core/services/store/modules/htmlhead.module";

export default {
  name: "home",
  components: {},
  data() {
    return {
      services: []
    };
  },
  mounted() {
    this.$store.dispatch(SET_BREADCRUMB, [{ title: "home" }]);
    this.$store.dispatch(SET_HEAD_TITLE, "home");
  },
  methods: {},
  apollo: {
    services: {
      query: queryServices,
      update: data => data.services
    }
  }
};
</script>
