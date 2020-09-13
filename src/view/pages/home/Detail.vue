<template>
  <div>
    <!--begin::Dashboard-->
    <div class="row" id="kt-home">
      <div id="nav"></div>
      <router-link
          to="/detail"
          v-slot="{ href, navigate, isActive, isExactActive }"
      >
        <a
            :href="href"
            class="text-primary font-weight-bolder"
            @click="navigate"
        >
        </a>
      </router-link>
      
    </div>
    <div
        class="row justify-content-center my-10 px-8 my-lg-15 px-lg-10 position-relative"
    >
      <div class="col-xl-12 col-xxl-7"></div>
    </div>

    <div
        class="row justify-content-center my-10 px-8 my-lg-15 px-lg-10 position-relative"
    >
      <div align="center"></div>
    </div>
    <detail></detail>

    <div
        class="row justify-content-center my-10 px-8 my-lg-15 px-lg-10 position-relative"
    >
      <div align="center"></div>
    </div>
  </div>

  <!--end::Dashboard-->
</template>

<script>
import { SET_BREADCRUMB } from "@/core/services/store/modules/breadcrumbs.module";
import { queryServices } from "@/graphql/home-queries";
import { SET_HEAD_TITLE } from "@/core/services/store/modules/htmlhead.module";
import detail from  "@/view/pages/home/Badge";

export default {
  name: "home",
  components: {
    detail
  },
  data() {
    return {
      services: [],
      images: {
        image1: require("@/assets/media/books/1.png")
      }
    };
  },
  mounted() {
    this.$store.dispatch(SET_BREADCRUMB, [{ title: "home" }]);
    this.$store.dispatch(SET_HEAD_TITLE, [{ title: "home" }]);
  },
  methods: {
    setActiveTab1(event) {
      this.tabIndex = this.setActiveTab(event);
    },
    setActiveTab2(event) {
      this.tabIndex2 = this.setActiveTab(event);
    },
    /**
     * Set current active on click
     * @param event
     */
    setActiveTab(event) {
      // get all tab links
      const tab = event.target.closest('[role="tablist"]');
      const links = tab.querySelectorAll(".nav-link");
      // remove active tab links
      for (let i = 0; i < links.length; i++) {
        links[i].classList.remove("active");
      }

      // set current active tab
      event.target.classList.add("active");

      // set clicked tab index to bootstrap tab
      return parseInt(event.target.getAttribute("data-tab"));
    }
  },
  apollo: {
    services: {
      query: queryServices,
      update: data => data.services
    }
  }
};
</script>
