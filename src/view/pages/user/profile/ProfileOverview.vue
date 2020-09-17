<template>
  <!--begin::Content-->
  <div class="flex-row-fluid ml-lg-8">
    <!--begin::Row-->
    <div class="card card-custom card-stretch">
      <div class="card-body d-flex p-0">
        <div
          class="flex-grow-1 p-20 pb-40 card-rounded flex-grow-1 bgi-no-repeat"
          style="background-position: calc(100% + 0.5rem) bottom; background-size: 50% auto; background-image: url(media/svg/humans/custom-10.svg)"
        >
          <h2 class="text-dark pb-5 font-weight-bolder">Start Now</h2>

          <p class="text-dark-50 pb-5 font-size-h5">
            With our responsive themes and mobile<br />
            and desktop apps, enjoy a seamless<br />
            experience on any device so will your<br />
            blog's common visitors
          </p>

          <a href="#" class="btn btn-danger font-weight-bold py-2 px-6"
            >Start Now</a
          >
        </div>
      </div>
    </div>
    <!--end::Engage Widget 11-->
  </div>
  <!--end::Content-->
</template>

<style scoped></style>

<script>
import { SET_BREADCRUMB } from "@/core/services/store/modules/breadcrumbs.module";
import { SET_HEAD_TITLE } from "@/core/services/store/modules/htmlhead.module";

export default {
  name: "ProfileOverview",
  mounted() {
    this.$store.dispatch(SET_BREADCRUMB, [{ title: "Profile Overview" }]);
    this.$store.dispatch(SET_HEAD_TITLE, "Profile Overview");
  }
};
</script>
