<template>
  <b-card
    img-src="media/books/img-72.jpg"
    img-alt="cover"
    img-top
    img-height="150"
    body-class="p-5"
    class="shadow-sm card-custom card-stretch"
  >
    <h5 class="card-title">{{ service.title }}</h5>
    <a href="#" class="d-flex align-items-start mb-5">
      <div class="symbol symbol-40 symbol-lg-50 symbol-circle bg-light">
        <img alt="Pic" src="media/stock-600x600/img-11.jpg" />
      </div>
      <span class="text-muted font-weight-bold ml-3">by</span>
      <span class="text-dark-75 font-weight-bold ml-2">{{
        service.account.fullName
      }}</span>
    </a>

    <button class="btn btn-light btn-lg btn-block btn-square font-weight-bold">
      Order Now
    </button>
  </b-card>
</template>
<style>
.card-img-top {
  object-fit: cover;
}
.card-title {
  color: #3f4254 !important;
  min-height: 57px;
}
.card-title:hover {
  color: black !important;
}
</style>

<script>
export default {
  name: "service-card",
  props: ["service"]
};
</script>
