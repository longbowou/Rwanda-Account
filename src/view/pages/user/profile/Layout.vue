<template>
  <div class="d-flex flex-row">
    <!--begin::Aside-->
    <div
      class="flex-row-auto offcanvas-mobile w-300px w-xl-350px"
      id="kt_profile_aside"
    >
      <!--begin::Profile Card-->
      <div class="card card-custom card-stretch">
        <!--begin::Body-->
        <div class="card-body pt-4">
          <!--begin::User-->
          <div class="d-flex align-items-center mt-4">
            <div
              class="symbol symbol-60 symbol-xxl-100 mr-5 align-self-start align-self-xxl-center"
            >
              <div
                class="symbol-label"
                style="background-image:url('media/svg/icons/General/User.svg')"
              ></div>
              <i class="symbol-badge bg-success"></i>
            </div>
            <div>
              <a
                href="#"
                class="font-weight-bolder font-size-h5 text-dark-75 text-hover-primary"
              >
                {{ currentAccount !== null ? currentAccount.fullName : null }}
              </a>
            </div>
          </div>
          <!--end::User-->

          <!--begin::Contact-->
          <div class="py-9">
            <div class="d-flex align-items-center justify-content-between mb-2">
              <span class="font-weight-bold mr-2">Username:</span>
              <span class="text-muted text-hover-primary">{{
                currentAccount !== null ? currentAccount.username : null
              }}</span>
            </div>

            <div class="d-flex align-items-center justify-content-between mb-2">
              <span class="font-weight-bold mr-2">Email:</span>
              <span class="text-muted text-hover-primary">{{
                currentAccount !== null ? currentAccount.email : null
              }}</span>
            </div>

            <div class="d-flex align-items-center justify-content-between mb-2">
              <span class="font-weight-bold mr-2">Balance:</span>
              <span class="text-muted text-hover-primary">
                {{ currentAccount !== null ? currentAccount.balance : null }}
                {{ currency }}
              </span>
            </div>
          </div>
          <!--end::Contact-->

          <!--begin::Nav-->
          <div class="navi navi-bold navi-hover navi-active navi-link-rounded">
            <div class="navi-item mb-2">
              <router-link
                :to="{ name: 'profile-overview' }"
                v-slot="{ href, navigate, isActive, isExactActive }"
              >
                <a
                  :href="href"
                  :class="[
                    'navi-link py-4',
                    isActive && 'active',
                    isExactActive && 'active'
                  ]"
                  @click="navigate"
                >
                  <span class="navi-icon mr-2">
                    <span class="svg-icon">
                      <inline-svg src="media/svg/icons/Design/Layers.svg" />
                    </span>
                  </span>
                  <span class="navi-text font-size-lg">
                    {{ $t("Profile Overview") }}
                  </span>
                </a>
              </router-link>
            </div>

            <div class="navi-item mb-2">
              <router-link
                :to="{ name: 'personal-information' }"
                v-slot="{ href, navigate, isActive, isExactActive }"
              >
                <a
                  :href="href"
                  :class="[
                    'navi-link py-4',
                    isActive && 'active',
                    isExactActive && 'active'
                  ]"
                  @click="navigate"
                >
                  <span class="navi-icon mr-2">
                    <span class="svg-icon">
                      <inline-svg src="media/svg/icons/General/User.svg" />
                    </span>
                  </span>
                  <span class="navi-text font-size-lg">
                    {{ $t("Personal Information") }}
                  </span>
                </a>
              </router-link>
            </div>

            <div class="navi-item mb-2">
              <router-link
                :to="{ name: 'change-password' }"
                v-slot="{ href, navigate, isActive, isExactActive }"
              >
                <a
                  :href="href"
                  :class="[
                    'navi-link py-4',
                    isActive && 'active',
                    isExactActive && 'active'
                  ]"
                  @click="navigate"
                >
                  <span class="navi-icon mr-2">
                    <span class="svg-icon">
                      <inline-svg
                        src="media/svg/icons/Communication/Shield-user.svg"
                      />
                    </span>
                  </span>
                  <span class="navi-text font-size-lg">
                    {{ $t("Change Password") }}
                  </span>
                </a>
              </router-link>
            </div>
          </div>
          <!--end::Nav-->
        </div>
        <!--end::Body-->
      </div>
      <!--end::Profile Card-->
    </div>
    <!--end::Aside-->

    <router-view />
  </div>
</template>

<style scoped></style>

<script>
import { mapGetters } from "vuex";

export default {
  name: "ProfileLayout",
  computed: {
    ...mapGetters(["currentAccount", "currency"])
  }
};
</script>
