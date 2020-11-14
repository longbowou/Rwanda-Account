<template>
  <div class="card card-custom shadow-sm">
    <div class="card-body p-5">
      <a href="#" class="d-flex align-items-start mb-5">
        <div class="symbol symbol-40 symbol-lg-50 symbol-circle bg-light">
          <img alt="Pic" src="media/stock-600x600/img-11.jpg" />
        </div>
        <span class="text-dark-75 font-weight-bold ml-2">
          {{ user ? user.firstName : null }}
        </span>
      </a>

      <hr />

      <a
        href="#"
        class="btn btn-light btn-square font-weight-bold pl-2 pr-2"
        style="width: 40%"
        >Contact</a
      >

      <a
        href="#"
        class="btn btn-light btn-square font-weight-bold float-right pl-2 pr-2"
        style="width: 40%"
        >View Profile</a
      >
    </div>
  </div>
</template>
<style scoped></style>

<script>
export default {
  name: "UserCard",
  props: ["user"]
};
</script>
