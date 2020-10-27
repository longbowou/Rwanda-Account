<template>
  <div>
    <div class="card card-custom shadow-sm mb-5">
      <div class="card-header">
        <div class="card-title">
          <h3 class="card-label">
            Litigation
          </h3>

          <span
            :class="[
              'ml-3 label label-xl font-weight-bold label-inline label-square',
              litigation.opened && 'label-dark',
              litigation.handled && 'label-success'
            ]"
          >
            {{ litigation.status }}
          </span>

          <span
            v-if="litigation.handled"
            :class="[
              'ml-3 label label-xl font-weight-bold label-inline label-square',
              litigation.approved && 'label-success',
              litigation.canceled && 'label-danger'
            ]"
          >
            {{ litigation.decision }}
          </span>
        </div>
      </div>

      <div class="card-body pt-2">
        <h3>{{ litigation.title }}</h3>

        <div v-html="litigation.content"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LitigationView",
  props: ["litigation"]
};
</script>

<style scoped></style>
