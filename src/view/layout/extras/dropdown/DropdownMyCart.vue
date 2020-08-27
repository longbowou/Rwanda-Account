<template>
  <form>
    <!--begin::Header-->
    <div
      class="d-flex align-items-center py-10 px-8 bgi-size-cover bgi-no-repeat rounded-top"
      :style="{ backgroundImage: `url(${backgroundImage})` }"
    >
      <span class="btn btn-md btn-icon bg-white-o-15 mr-4">
        <i class="flaticon2-shopping-cart-1 text-success" />
      </span>
      <h4 class="text-white m-0 flex-grow-1 mr-3">Purchases in progress</h4>
      <!--      <button type="button" class="btn btn-success btn-sm">2 Items</button>-->
    </div>
    <!--end::Header-->

    <div
      class="d-flex flex-center text-center text-muted min-h-200px"
      v-if="isEmpty"
    >
      All caught up!
      <br />
      No new purchases.
    </div>

    <div class="scroll scroll-push" v-if="isNotEmpty">
      <perfect-scrollbar
        class="scroll"
        style="max-height: 30vh; position: relative;"
      >
        <!--begin::Item-->
        <template v-for="(item, i) in list">
          <div
            class="d-flex align-items-center justify-content-between p-8"
            v-bind:key="i"
          >
            <div class="d-flex flex-column mr-2">
              <a
                href="#"
                class="font-weight-bold text-dark-75 font-size-lg text-hover-primary"
              >
                {{ item.title }}
              </a>
              <span class="text-muted">
                {{ item.desc }}
              </span>
              <div class="d-flex align-items-center mt-2">
                <span class="font-weight-bold mr-1 text-dark-75 font-size-3">
                  {{ item.price }}
                </span>
                <span class="text-muted mr-1">for</span>
                <span class="font-weight-bold mr-2 text-dark-75 font-size-3">
                  {{ item.quantity }}
                </span>
                <a href="#" class="btn btn-xs btn-light-success btn-icon mr-2">
                  <i class="ki ki-minus icon-xs"></i>
                </a>
                <a href="#" class="btn btn-xs btn-light-success btn-icon">
                  <i class="ki ki-plus icon-xs"></i>
                </a>
              </div>
            </div>
            <a href="#" class="symbol symbol-70 flex-shrink-0">
              <img :src="item.img" alt="" />
            </a>
          </div>
        </template>
        <!--end::Item-->
        <div class="separator separator-solid"></div>
      </perfect-scrollbar>
    </div>
  </form>
</template>

<script>
export default {
  name: "KTDropdownMyCart",
  data() {
    return {
      list: [
        // {
        //   title: "iBlender",
        //   desc: "Best kichen badge in 2020",
        //   price: "$ 350",
        //   quantity: "5",
        //   img: process.env.BASE_URL + "media/stock-600x400/img-1.jpg"
        // }
      ]
    };
  },
  computed: {
    isEmpty() {
      return this.list.length === 0;
    },
    isNotEmpty() {
      return !this.isEmpty;
    },
    backgroundImage() {
      return process.env.BASE_URL + "media/misc/bg-1.jpg";
    }
  }
};
</script>
