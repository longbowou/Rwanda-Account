<template>
  <div>
    <div class="row">
      <div class="card col-sm-12 card-custom bgi-position-center shadow-sm">
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
        <div :key="service.id" class="col-sm-3 mb-5">
          <router-link
            :to="{ name: 'service-detail', params: { id: service.id } }"
            v-slot="{ href, navigate, isActive, isExactActive }"
          >
            <a :href="href" @click="href">
              <service-card :service="service"></service-card>
            </a>
          </router-link>
        </div>
      </template>
    </div>
    <div class="row justify-content-center">
      <p></p>
      <p></p>
    </div>
    <div class="row justify-content" style="background-color: #a2d4ed">
      <div class="col-md-6">
        <img src="media/books/img-72.jpg" />
      </div>
      <div
        class="col-md-6 background-color:blue text-center"
        style="margin-top: 120px"
      >
        <h2>Work from home</h2>
        <h3>earn money by becoming a salesperson on <b>MDTAF</b></h3>
        <button
          style="width: 100%"
          class="btn btn-light btn-lg btn-square btn-block font-weight-bold p-0 text-left"
        >
          <router-link
            to="/register"
            v-slot="{ href, navigate, isActive, isExactActive }"
          >
            <a
              :href="href"
              class="text-primary font-weight-bolder"
              @click="navigate"
            >
              <span
                class="btn btn-dark btn-lg btn-square font-weight-bold"
                style="width: 65%"
                >Become a seller
              </span>
            </a>
          </router-link>
        </button>
      </div>
    </div>
  </div>

  <!--end::Dashboard-->
</template>
<style lang="scss">
@import "~@/assets/sass/pages/wizard/wizard-1.scss";
</style>

<script>
import { SET_BREADCRUMB } from "@/core/services/store/modules/breadcrumbs.module";
import { queryServices } from "@/graphql/service-queries";
import { SET_HEAD_TITLE } from "@/core/services/store/modules/htmlhead.module";
import ServiceCard from "@/view/pages/service/ServiceCard";

export default {
  name: "Home",
  components: { ServiceCard },
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
