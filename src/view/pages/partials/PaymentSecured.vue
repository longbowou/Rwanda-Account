<template>
  <div>
    <hr />

    <p class="text-center font-weight-bold m-0">
      {{ $t("Payment") }}
      <span class="text-success"
        ><i class="flaticon2-lock text-success" /> {{ $t("Secured") }}</span
      >
      <br />
      <small>{{ $t("Your information is encrypted by SSL") }}</small>
    </p>
  </div>
</template>

<script>
export default {
  name: "PaymentSecured"
};
</script>

<style scoped></style>
