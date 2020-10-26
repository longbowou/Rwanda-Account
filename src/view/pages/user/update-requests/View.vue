<template>
  <div>
    <div
      class="alert alert-custom alert-notice alert-light-warning fade show m-0"
      role="alert"
    >
      <div class="alert-icon">
        <span class="svg-icon svg-icon-lg svg-icon-3x svg-icon-warning mr-3">
          <!--begin::Svg Icon-->
          <inline-svg src="media/svg/icons/Code/Info-circle.svg" />
          <!--end::Svg Icon-->
        </span>
      </div>
      <div class="alert-text text-justify font-weight-bold">
        You ask an update. Please wait the seller to
        <strong>accept or reject</strong> your update request.
      </div>
    </div>

    <div class="card card-custom shadow-sm mb-5 mt-5">
      <div class="card-header">
        <div class="card-title">
          <h3 class="card-label">
            Update request
          </h3>

          <span
            :class="[
              'ml-3 label label-xl font-weight-bold label-inline label-square',
              updateRequest.initiated && 'label-dark',
              updateRequest.accepted && 'label-success',
              updateRequest.rejected && 'label-danger'
            ]"
          >
            {{ updateRequest.status }}
          </span>
        </div>
      </div>

      <div class="card-body pt-2">
        <h3>{{ updateRequest.title }}</h3>

        <div v-html="updateRequest.content"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "UpdateRequestView",
  props: ["updateRequest"]
};
</script>

<style scoped></style>
