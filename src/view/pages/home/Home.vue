<template>
  <div class="">
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
                      {{
                        $t(
                          "1. Order a service from your choice to one of our sellers"
                        )
                      }}
                    </h3>
                  </div>
                  <i class="wizard-arrow flaticon2-next"></i>
                </div>

                <div class="wizard-step" data-wizard-type="step">
                  <div class="wizard-label">
                    <i class="wizard-icon flaticon2-chat-1"></i>
                    <h3 class="wizard-title">
                      {{
                        $t(
                          "2. Exchange by chat with the seller to safe delivery"
                        )
                      }}
                    </h3>
                  </div>
                  <i class="wizard-arrow flaticon2-next"></i>
                </div>

                <div class="wizard-step" data-wizard-type="step">
                  <div class="wizard-label">
                    <i class="wizard-icon flaticon2-open-box"></i>
                    <h3 class="wizard-title">
                      {{ $t("3. Get your service delivered") }}
                    </h3>
                  </div>
                  <i class="wizard-arrow flaticon2-next"></i>
                </div>

                <div class="wizard-step" data-wizard-type="step">
                  <div class="wizard-label">
                    <i class="wizard-icon flaticon2-checkmark"></i>
                    <h3 class="wizard-title">
                      {{
                        $t(
                          "4. The seller is paid only after the delivery of the service"
                        )
                      }}
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <h1 class="text-center mt-10 mb-5">{{ $t("Services for sale") }}</h1>

    <div class="row justify-content-center">
      <div class="spinner spinner-center" v-if="isFetchingService"></div>
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
  </div>

  <!--end::Dashboard-->
</template>
<style lang="scss">
@import "~@/assets/sass/pages/wizard/wizard-1.scss";
</style>

<script>
import { SET_BREADCRUMB } from "@/core/services/store/modules/breadcrumbs.module";
import { queryServicesForPreview } from "@/graphql/service-queries";
import { SET_HEAD_TITLE } from "@/core/services/store/modules/htmlhead.module";
import ServiceCard from "@/view/pages/service/ServiceCard";

export default {
  name: "Home",
  components: { ServiceCard },
  data() {
    return {
      services: [],
      isFetchingService: false
    };
  },
  computed() {
    {
      return this.isFetchingService;
    }
  },
  mounted() {
    this.$store.dispatch(SET_BREADCRUMB, [{ title: "Home" }]);
    this.$store.dispatch(SET_HEAD_TITLE, "Home");
  },
  beforeMount() {
    this.fetchServices();
  },
  methods: {
    async fetchServices() {
      this.isFetchingService = true;
      const result = await this.$apollo.query({
        query: queryServicesForPreview
      });

      if (window._.isEmpty(result.errors)) {
        this.services = result.data.services;
      }

      this.isFetchingService = false;
    }
  }
};
</script>
