<template>
  <!-- begin:: Footer -->
  <div
    class="footer kt-grid__item bgi-position-center-center bgi-size-cover bgi-no-cover"
    id="kt_footer"
    style="background-image: url('media/bg/bg-mdtaf.png');"
  >
    <!--begin::Container-->
    <div class="container py-lg-18 py-8">
      <!--begin::Row-->
      <div class="row">
        <!--begin::Col-->
        <div class="col-lg-4 my-lg-0 my-5">
          <h4 class="text-white pb-3">{{ brand }}</h4>
          <p
            class="m-0 text-white opacity-45"
            v-html="
              $t(
                'Product of Maison du Digital.<br />Platform for buying and selling digital services based in LOME TOGO.'
              )
            "
          ></p>
        </div>
        <!--end::Col-->
        <!--begin::Col-->
        <div class="col-lg-4 my-lg-0 my-5">
          <h4 class="text-white pb-3">
            {{ $t("Quick Links") }}
          </h4>
          <div class="d-flex align-items-center">
            <div class="d-flex flex-column mr-18">
              <router-link
                to="/home"
                v-slot="{ href, navigate, isActive, isExactActive }"
              >
                <a
                  :href="href"
                  class="text-white opacity-55 text-hover-primary"
                  @click="navigate"
                >
                  {{ $t("Home") }}
                </a>
              </router-link>
            </div>

            <div class="d-flex flex-column"></div>
          </div>
        </div>
        <!--end::Col-->
        <!--begin::Col-->
        <div class="col-lg-4 my-lg-0 my-5">
          <h4 class="text-white pb-3">
            {{ $t("Get In Touch") }}
          </h4>
          <form class="rounded" style="background-color: rgba(0,0,0,.2);">
            <div class="input-group p-2 align-items-center">
              <input
                type="text"
                class="form-control rounded-right border-0 bg-transparent text-white opacity-80"
                placeholder="Enter Your Email"
              />
              <div class="input-group-append p-0 mr-1">
                <button
                  class="btn btn-fh btn-sm btn-primary px-6 rounded-left"
                  style="z-index: 1"
                  type="button"
                >
                  {{ $t("Join us") }}
                </button>
              </div>
            </div>
          </form>
        </div>
        <!--end::Col-->
      </div>
      <!--end::Row-->
    </div>
    <!--end::Container-->
    <!--begin::Container-->
    <div class="separator separator-solid opacity-7"></div>
    <!--end::Container-->
    <!--begin::Container-->
    <div class="container py-8">
      <div
        class="d-flex align-items-center justify-content-between flex-lg-row flex-column"
      >
        <!--begin::Copyright-->
        <div class="d-flex align-items-center order-lg-1 order-2">
          <img
            alt="Logo"
            src="media/logos/logo.png"
            class="logo-sticky max-h-35px"
          />
          <span class="text-muted font-weight-bold mx-2">2020 ©</span>
          <a href="#" class="text-primary text-hover-primary">
            Maison du Digitale
          </a>
        </div>
        <!--end::Copyright-->
        <!--begin::Nav-->
        <div class="d-flex align-items-center order-lg-2 order-1 mb-lg-0 mb-5">
          Powered by
          <a
            href="https://gitlab.com/longbowou"
            target="_blank"
            class="text-white opacity-55 pl-0 text-hover-primary ml-2 mr-2"
          >
            Longbowou
          </a>
          &
          <a
            href="https://gitlab.com/Stalia"
            target="_blank"
            class="text-white opacity-55 pl-0 text-hover-primary ml-2"
          >
            Esther KANGBIETE
          </a>
        </div>
        <!--end::Nav-->
      </div>
    </div>
    <!--end::Container-->
  </div>
  <!-- end:: Footer -->
</template>

<script>
import { mapGetters } from "vuex";
import { BRAND } from "@/core/config/app";

export default {
  name: "KTFooter",
  data() {
    return {
      brand: BRAND
    };
  },
  computed: {
    ...mapGetters(["layoutConfig"]),

    /**
     * Check if footer container is fluid
     */
    widthFluid() {
      return this.layoutConfig("footer.width") === "fluid";
    }
  }
};
</script>
