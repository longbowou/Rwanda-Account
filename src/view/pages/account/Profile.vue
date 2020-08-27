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
                style="background-image:url('media/users/300_21.jpg')"
              ></div>
              <i class="symbol-badge bg-success"></i>
            </div>
            <div>
              <a
                href="#"
                class="font-weight-bolder font-size-h5 text-dark-75 text-hover-primary"
              >
                James Jones
              </a>
              <div class="text-muted">
                Application Developer
              </div>
              <div class="mt-2">
                <a
                  href="#"
                  class="btn btn-sm btn-primary font-weight-bold mr-2 py-2 px-3 px-xxl-5 my-1"
                  >Chat</a
                >
                <a
                  href="#"
                  class="btn btn-sm btn-success font-weight-bold py-2 px-3 px-xxl-5 my-1"
                  >Follow</a
                >
              </div>
            </div>
          </div>
          <!--end::User-->

          <!--begin::Contact-->
          <div class="py-9">
            <div class="d-flex align-items-center justify-content-between mb-2">
              <span class="font-weight-bold mr-2">Email:</span>
              <a href="#" class="text-muted text-hover-primary"
                >matt@fifestudios.com</a
              >
            </div>
            <div class="d-flex align-items-center justify-content-between mb-2">
              <span class="font-weight-bold mr-2">Phone:</span>
              <span class="text-muted">44(76)34254578</span>
            </div>
            <div class="d-flex align-items-center justify-content-between">
              <span class="font-weight-bold mr-2">Location:</span>
              <span class="text-muted">Melbourne</span>
            </div>
          </div>
          <!--end::Contact-->

          <!--begin::Nav-->
          <div class="navi navi-bold navi-hover navi-active navi-link-rounded">
            <div class="navi-item mb-2">
              <router-link
                to="/profile-overview"
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
                    Profile Overview
                  </span>
                </a>
              </router-link>
            </div>

            <div class="navi-item mb-2">
              <router-link
                to="/personal-information"
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
                    Personal Information
                  </span>
                </a>
              </router-link>
            </div>

            <div class="navi-item mb-2">
              <router-link
                to="/change-password"
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
                    Change Password
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

    <transition name="fade-in-up">
      <router-view />
    </transition>
  </div>
</template>

<style scoped></style>

<script>
export default {
  name: "Profile"
};
</script>
