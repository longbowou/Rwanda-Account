<template>
  <div class="row justify-content-center">
    <div class="spinner spinner-center" v-if="isFetchingService"></div>
    <template v-for="service in category.services">
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
import { queryServiceCategory } from "@/graphql/service-queries";
import { SET_HEAD_TITLE } from "@/core/services/store/modules/htmlhead.module";
import ServiceCard from "@/view/pages/services/ServiceCard";

export default {
  name: "Category",
  components: { ServiceCard },
  data() {
    return {
      category: {},
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
  mounted() {},
  beforeRouteUpdate(to, from, next) {
    this.fetchCategory();
    next();
  },
  methods: {
    async fetchCategory() {
      this.isFetchingService = true;
      const result = await this.$apollo.query({
        query: queryServiceCategory,
        variables: { id: this.$route.params.id }
      });

      if (window._.isEmpty(result.errors)) {
        this.category = result.data.serviceCategory;

        this.$store.dispatch(SET_BREADCRUMB, [{ title: this.getTitle }]);
        this.$store.dispatch(SET_HEAD_TITLE, this.getTitle);
      }

      this.isFetchingService = false;
    }
  }
};
</script>
