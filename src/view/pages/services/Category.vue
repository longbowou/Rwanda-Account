<template>
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
</template>
<style lang="scss">
@import "~@/assets/sass/pages/wizard/wizard-1.scss";
</style>

<script>
import { SET_BREADCRUMB } from "@/core/services/store/modules/breadcrumbs.module";
import {
  queryServiceCategory,
  queryServiceCategoryServices
} from "@/graphql/service-queries";
import { SET_HEAD_TITLE } from "@/core/services/store/modules/htmlhead.module";
import ServiceCard from "@/view/pages/services/ServiceCard";

export default {
  name: "Category",
  components: { ServiceCard },
  data() {
    return {
      category: {},
      services: [],
      isFetchingService: false
    };
  },
  computed: {
    getTitle() {
      if (window._.has(this.category, "label")) {
        return this.category.label;
      }

      return "";
    }
  },
  mounted() {
    this.fetchData(this.$route.params.id);
  },
  beforeRouteUpdate(to, from, next) {
    this.fetchData(to.params.id);
    next();
  },
  methods: {
    fetchData(id) {
      this.fetchCategory(id);
      this.fetchServices(id);
    },
    async fetchCategory(id) {
      const result = await this.$apollo.query({
        query: queryServiceCategory,
        variables: { id: id }
      });

      if (window._.isEmpty(result.errors)) {
        this.category = result.data.serviceCategory;

        await this.$store.dispatch(SET_BREADCRUMB, [{ title: this.getTitle }]);
        await this.$store.dispatch(SET_HEAD_TITLE, this.getTitle);
      }
    },
    async fetchServices(id) {
      this.isFetchingService = true;
      const result = await this.$apollo.query({
        query: queryServiceCategoryServices,
        variables: { id: id }
      });

      if (window._.isEmpty(result.errors)) {
        this.services = result.data.serviceCategoryServices;
      }

      this.isFetchingService = false;
    }
  }
};
</script>
