<template>
  <div class="topbar-item">
    <div
      id="kt_quick_user_toggle"
      class="btn btn-icon btn-hover-transparent-white d-flex align-items-center btn-lg px-md-2 w-md-auto"
    >
      <span
        class="text-white opacity-70 font-weight-bold font-size-base d-none d-md-inline mr-1"
      >
        Hi,
      </span>
      <span
        class="text-white opacity-90 font-weight-bolder font-size-base d-none d-md-inline mr-2"
      >
        {{ currentAccount !== null ? currentAccount.fullName : null }}
      </span>
      <span class="symbol symbol-35">
        <span
          class="symbol-label text-white font-size-h5 font-weight-bold bg-white-o-30"
        >
          {{ currentAccount !== null ? currentAccount.fullName[0] : null }}
        </span>
      </span>
    </div>

    <div
      id="kt_quick_user"
      ref="kt_quick_user"
      class="offcanvas offcanvas-right p-10"
    >
      <!--begin::Header-->
      <div
        class="offcanvas-header d-flex align-items-center justify-content-between pb-5"
      >
        <h3 class="font-weight-bold m-0">
          User Profile
          <!--          <small class="text-muted font-size-sm ml-2">12 messages</small>-->
        </h3>
        <a
          href="#"
          class="btn btn-xs btn-icon btn-light btn-hover-primary"
          id="kt_quick_user_close"
        >
          <i class="ki ki-close icon-xs text-muted"></i>
        </a>
      </div>
      <!--end::Header-->

      <!--begin::Content-->
      <perfect-scrollbar
        class="offcanvas-content pr-5 mr-n5 scroll"
        style="max-height: 90vh; position: relative;"
      >
        <!--begin::Header-->
        <div class="d-flex align-items-center mt-5">
          <div class="symbol symbol-100 mr-5">
            <img class="symbol-label" :src="picture" alt="" />
            <i class="symbol-badge bg-success"></i>
          </div>
          <div class="d-flex flex-column">
            <a
              href="#"
              class="font-weight-bold font-size-h5 text-dark-75 text-hover-primary"
            >
              {{ currentAccount !== null ? currentAccount.fullName : null }}
            </a>
            <div class="navi mt-2">
              <a href="#" class="navi-item">
                <span class="navi-link p-0 pb-2">
                  <span class="navi-icon mr-1">
                    <span class="svg-icon svg-icon-lg svg-icon-primary">
                      <!--begin::Svg Icon-->
                      <inline-svg
                        src="media/svg/icons/Shopping/Credit-card.svg"
                      />
                      <!--end::Svg Icon-->
                    </span>
                  </span>
                  <span class="navi-text text-muted text-hover-primary">
                    {{
                      currentAccount !== null ? currentAccount.balance : null
                    }}
                    {{ currency }}
                  </span>
                </span>
              </a>
            </div>
            <div class="navi mt-2">
              <a href="#" class="navi-item">
                <span class="navi-link p-0 pb-2">
                  <span class="navi-icon mr-1">
                    <span class="svg-icon svg-icon-lg svg-icon-primary">
                      <!--begin::Svg Icon-->
                      <inline-svg
                        src="media/svg/icons/Communication/Mail-notification.svg"
                      />
                      <!--end::Svg Icon-->
                    </span>
                  </span>
                  <span class="navi-text text-muted text-hover-primary">
                    {{ currentAccount !== null ? currentAccount.email : null }}
                  </span>
                </span>
              </a>
            </div>
            <button class="btn btn-light-primary btn-bold" @click="onLogout">
              Sign out
            </button>
          </div>
        </div>
        <!--end::Header-->
        <div class="separator separator-dashed mt-8 mb-5"></div>
        <!--begin::Nav-->
        <div class="navi navi-spacer-x-0 p-0">
          <!--begin::Item-->
          <router-link
            to="/profile-overview"
            @click.native="closeOffcanvas"
            class="navi-item"
          >
            <div class="navi-link">
              <div class="symbol symbol-40 bg-light mr-3">
                <div class="symbol-label">
                  <span class="svg-icon svg-icon-md svg-icon-success">
                    <!--begin::Svg Icon-->
                    <inline-svg
                      src="media/svg/icons/General/Notification2.svg"
                    />
                    <!--end::Svg Icon-->
                  </span>
                </div>
              </div>
              <div class="navi-text">
                <div class="font-weight-bold">My Profile</div>
                <div class="text-muted">
                  Your account settings
                </div>
              </div>
            </div>
          </router-link>
          <!--end:Item-->
          <!--begin::Item-->
          <router-link
            to="/builder"
            @click.native="closeOffcanvas"
            href="#"
            class="navi-item"
          >
            <div class="navi-link">
              <div class="symbol symbol-40 bg-light mr-3">
                <div class="symbol-label">
                  <span class="svg-icon svg-icon-md svg-icon-warning">
                    <!--begin::Svg Icon-->
                    <inline-svg src="media/svg/icons/Shopping/Cart1.svg" />
                    <!--end::Svg Icon-->
                  </span>
                </div>
              </div>
              <div class="navi-text">
                <div class="font-weight-bold">My Purchases</div>
                <div class="text-muted">Your recent purchases</div>
              </div>
            </div>
          </router-link>
          <!--end:Item-->
          <!--begin::Item-->
          <router-link
            to="/builder"
            @click.native="closeOffcanvas"
            href="#"
            class="navi-item"
          >
            <div class="navi-link">
              <div class="symbol symbol-40 bg-light mr-3">
                <div class="symbol-label">
                  <span class="svg-icon svg-icon-md svg-icon-danger">
                    <!--begin::Svg Icon-->
                    <inline-svg src="media/svg/icons/Shopping/Box2.svg" />
                    <!--end::Svg Icon-->
                  </span>
                </div>
              </div>
              <div class="navi-text">
                <div class="font-weight-bold">My Services</div>
                <div class="text-muted">Your recent services</div>
              </div>
            </div>
          </router-link>
          <!--end:Item-->
        </div>
        <!--end::Nav-->
        <div class="separator separator-dashed my-7"></div>
        <!--begin::Notifications-->
        <div>
          <!--begin:Heading-->
          <h5 class="mb-5">Recent Notifications</h5>
          <!--end:Heading-->

          <div
            class="d-flex flex-center text-center text-muted min-h-200px"
            v-if="isEmpty"
          >
            All caught up!
            <br />
            No new notifications.
          </div>

          <div v-if="isNotEmpty">
            <template v-for="(item, i) in list">
              <!--begin::Item -->
              <div
                class="d-flex align-items-center rounded p-5 gutter-b"
                v-bind:class="`bg-light-${item.type}`"
                v-bind:key="i"
              >
                <span
                  class="svg-icon mr-5"
                  v-bind:class="`svg-icon-${item.type}`"
                >
                  <span class="svg-icon svg-icon-lg">
                    <!--begin::Svg Icon-->
                    <inline-svg :src="item.svg" />
                    <!--end::Svg Icon-->
                  </span>
                </span>
                <div class="d-flex flex-column flex-grow-1 mr-2">
                  <a
                    href="#"
                    class="font-weight-normal text-dark-75 text-hover-primary font-size-lg mb-1"
                  >
                    {{ item.title }}
                  </a>
                  <span class="text-muted font-size-sm">
                    {{ item.desc }}
                  </span>
                </div>
                <span
                  class="font-weight-bolder py-1 font-size-lg"
                  v-bind:class="`text-${item.type}`"
                >
                  {{ item.alt }}
                </span>
              </div>
              <!--end::Item -->
            </template>
          </div>
        </div>
        <!--end::Notifications-->
      </perfect-scrollbar>
      <!--end::Content-->
    </div>
  </div>
</template>

<style lang="scss" scoped>
#kt_quick_user {
  overflow: hidden;
}
</style>

<script>
import { mapGetters } from "vuex";
import { LOGOUT } from "@/core/services/store/modules/auth.module";
import KTLayoutQuickUser from "@/assets/js/layout/extended/quick-user.js";
import KTOffcanvas from "@/assets/js/components/offcanvas.js";

export default {
  name: "KTQuickUser",
  data() {
    return {
      list: [
        // {
        //   title: "Another purpose persuade",
        //   desc: "Due in 2 Days",
        //   alt: "+28%",
        //   svg: "media/svg/icons/Home/Library.svg",
        //   type: "warning"
        // }
      ]
    };
  },
  mounted() {
    // Init Quick User Panel
    KTLayoutQuickUser.init(this.$refs["kt_quick_user"]);
  },
  methods: {
    onLogout() {
      this.$store
        .dispatch(LOGOUT)
        .then(() => this.$router.push({ name: "signin" }));
    },
    closeOffcanvas() {
      new KTOffcanvas(KTLayoutQuickUser.getElement()).hide();
    }
  },
  computed: {
    ...mapGetters(["currentAccount", "currency"]),
    isEmpty() {
      return this.list.length === 0;
    },
    isNotEmpty() {
      return !this.isEmpty;
    },
    picture() {
      return process.env.BASE_URL + "media/svg/icons/General/User.svg";
    }
  }
};
</script>
