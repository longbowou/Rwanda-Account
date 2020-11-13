<template>
  <ul class="menu-nav">
    <router-link
      :to="{ name: 'home' }"
      v-slot="{ href, navigate, isActive, isExactActive }"
    >
      <li
        aria-haspopup="true"
        data-menu-toggle="hover"
        class="menu-item"
        :class="[
          isActive && 'menu-item-active',
          isExactActive && 'menu-item-active'
        ]"
      >
        <a :href="href" class="menu-link" @click="navigate">
          <span class="menu-text">
            {{ $t("Home") }}
          </span>
        </a>
      </li>
    </router-link>

    <template v-for="category of serviceCategories">
      <router-link
        v-if="isAuthenticated"
        :key="category.id"
        :to="{ name: 'service-category', params: { id: category.id } }"
        v-slot="{ href, navigate, isActive, isExactActive }"
      >
        <li
          aria-haspopup="true"
          data-menu-toggle="hover"
          class="menu-item"
          :class="[
            isActive && 'menu-item-active',
            isExactActive && 'menu-item-active'
          ]"
        >
          <a :href="href" class="menu-link" @click="navigate">
            <span class="menu-text">
              {{ category.label }}
            </span>
          </a>
        </li>
      </router-link>
    </template>
  </ul>
</template>

<script>
import { mapGetters } from "vuex";
import { queryServiceCategories } from "@/graphql/service-queries";

export default {
  name: "KTMenu",
  data() {
    return {
      serviceCategories: []
    };
  },
  computed: {
    ...mapGetters(["isAuthenticated"])
  },
  beforeMount() {
    this.fetchServiceCategories();
  },
  methods: {
    hasActiveChildren(match) {
      return this.$route["path"].indexOf(match) !== -1;
    },
    async fetchServiceCategories() {
      const result = await this.$apollo.query({
        query: queryServiceCategories
      });

      if (window._.isEmpty(result.errors)) {
        this.serviceCategories = result.data.serviceCategories;
      }
    }
  }
};
</script>
