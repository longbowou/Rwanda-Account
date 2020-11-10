<template>
  <!-- begin:: Header Topbar -->
  <div class="topbar">
    <!--begin: My Cart -->
    <b-dropdown
      v-if="isAuthenticated"
      size="sm"
      variant="link"
      toggle-class="topbar-item text-decoration-none"
      no-caret
      right
      no-flip
    >
      <template v-slot:button-content>
        <div
          class="btn btn-icon btn-hover-transparent-white btn-dropdown btn-lg mr-1"
        >
          <span class="svg-icon svg-icon-xl">
            <inline-svg src="media/svg/icons/Shopping/Cart3.svg" />
          </span>
        </div>
      </template>
      <b-dropdown-text tag="div" class="min-w-md-350px">
        <KTDropdownMyCart></KTDropdownMyCart>
      </b-dropdown-text>
    </b-dropdown>
    <!--end: My Cart -->

    <!--begin: Language bar -->
    <div class="topbar-item">
      <b-dropdown
        size="sm"
        variant="link"
        toggle-class="btn btn-icon btn-hover-transparent-white d-flex align-items-center btn-lg px-md-2 w-md-auto"
        no-caret
        right
        no-flip
      >
        <template v-slot:button-content>
          <img
            class="h-20px w-20px rounded-sm"
            :src="languageFlag || getLanguageFlag"
            alt=""
          />
        </template>
        <b-dropdown-text tag="div" class="min-w-md-175px">
          <KTDropdownLanguage
            v-on:language-changed="onLanguageChanged"
          ></KTDropdownLanguage>
        </b-dropdown-text>
      </b-dropdown>
    </div>
    <!--end: Language bar -->

    <div class="topbar-item" v-if="isNotAuthenticated">
      <router-link
        :to="{ name: 'signin' }"
        v-slot="{ href, navigate, isActive, isExactActive }"
      >
        <a
          :href="href"
          @click="navigate"
          class="btn btn-hover-transparent-white d-flex align-items-center btn-lg"
        >
          <span
            class="text-white opacity-90 font-weight-bolder font-size-base d-md-inline"
          >
            {{ $t("Login") }}
          </span>
        </a>
      </router-link>
    </div>

    <!--begin: User Bar -->
    <KTQuickUser v-if="isAuthenticated"></KTQuickUser>
    <!--end: User Bar -->
  </div>
  <!-- end:: Header Topbar -->
</template>

<style lang="scss">
.topbar {
  .dropdown-toggle {
    padding: 0;
    &:hover {
      text-decoration: none;
    }

    &.dropdown-toggle-no-caret {
      &:after {
        content: none;
      }
    }
  }

  .dropdown-menu {
    margin: 0;
    padding: 0;
    outline: none;
    .b-dropdown-text {
      padding: 0;
    }
  }
}
</style>

<script>
import { mapGetters } from "vuex";
import KTDropdownMyCart from "@/view/layout/extras/dropdown/DropdownMyCart.vue";
import KTDropdownLanguage from "@/view/layout/extras/dropdown/DropdownLanguage.vue";
import KTQuickUser from "@/view/layout/extras/offcanvas/QuickUser.vue";
import i18nService from "@/core/services/i18n.service.js";

export default {
  name: "KTTopbar",
  data() {
    return {
      languageFlag: "",
      languages: i18nService.languages
    };
  },
  components: {
    KTDropdownMyCart,
    KTDropdownLanguage,
    KTQuickUser
  },
  methods: {
    onLanguageChanged() {
      this.languageFlag = this.languages.find(val => {
        return val.lang === i18nService.getActiveLanguage();
      }).flag;
    }
  },
  computed: {
    ...mapGetters(["isAuthenticated", "isNotAuthenticated"]),
    getLanguageFlag() {
      return this.onLanguageChanged();
    }
  }
};
</script>
