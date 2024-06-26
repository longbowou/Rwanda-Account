<template>
  <div class="row">
    <div class="col-sm-12 col-md-8">
      <div class="card card-custom shadow-sm mb-5">
        <div class="card-header">
          <div class="card-title">
            <span
              class="svg-icon svg-icon-lg svg-icon-3x svg-icon-primary mr-3"
            >
              <!--begin::Svg Icon-->
              <inline-svg src="media/svg/icons/Shopping/Box2.svg" />
              <!--end::Svg Icon-->
            </span>

            <h3 class="card-label">
              {{ service.title }}
            </h3>
          </div>
        </div>

        <div class="card-body p-0">
          <img
            :src="
              service.fileUrl !== null ? service.fileUrl : 'media/picture.jpg'
            "
            width="100%"
            height="400"
            style="object-fit: cover"
            alt=""
          />

          <div class="p-5">
            <div v-html="service.content"></div>

            <span
              class="form-control-plaintext font-weight-bold"
              v-if="service.keywords"
            >
              <template v-for="(keyword, index) of service.keywords.split(',')">
                <span
                  :key="index"
                  class="mr-3 label label-xl font-weight-bold text-dark-50 label-inline label-square mb-2"
                >
                  {{ keyword }}
                </span>
              </template>
            </span>
          </div>
        </div>
      </div>

      <div class="card card-custom shadow-sm mb-5" v-if="hasOptions">
        <div class="card-header">
          <div class="card-title">
            <span
              class="svg-icon svg-icon-lg svg-icon-3x svg-icon-primary mr-3"
            >
              <!--begin::Svg Icon-->
              <inline-svg src="media/svg/icons/Shopping/Box2.svg" />
              <!--end::Svg Icon-->
            </span>

            <h3 class="card-label">
              {{ $t("Customize the service") }}
            </h3>
          </div>
        </div>

        <div class="card-body p-5">
          <div class="row">
            <div class="col-sm-1 mr-14">
              <span
                class="switch switch-lg switch-outline switch-success switch-icon"
              >
                <label>
                  <input
                    type="checkbox"
                    checked="checked"
                    disabled
                    name="select"
                  />
                  <span></span>
                </label>
              </span>
            </div>
            <div class="col-sm-12 col-md-9" ref="additionalOptions">
              <h2 class="mt-2">{{ service.title }}</h2>
              <span class="form-text text-dark-50">
                {{ service.delayDisplay }}
              </span>
            </div>
          </div>
          <hr />
          <h3 class="mt-8 mb-8 text-info text-center">
            {{ $t("Additional options") }}
          </h3>
          <template v-for="option of service.options">
            <div :key="option.id" class="row justify-content-center mb-3 ">
              <div class="col-sm-1 mr-14">
                <span
                  class="switch switch-lg switch-outline switch-info switch-icon"
                >
                  <label>
                    <input
                      v-on:change="clickCheckbox(option.id)"
                      v-model="options"
                      :id="'checkbox-' + option.id"
                      type="checkbox"
                      :value="option.id"
                    />
                    <span></span>
                  </label>
                </span>
              </div>
              <div
                class="col-sm-12 col-md-7 cursor-pointer"
                @click="clickCheckbox(option.id)"
              >
                <h5 class="mt-2">{{ option.label }}</h5>
                <span class="form-text text-dark-50">{{
                  option.delayPreviewDisplay
                }}</span>
              </div>
              <div
                @click="clickCheckbox(option.id)"
                class="col-sm-12 col-md-3 d-flex align-items-center cursor-pointer"
              >
                <h5 class="mt-2" :id="'price-' + option.id">
                  + {{ option.priceDisplay }} {{ currency }}
                </h5>
              </div>
              <div class="col-10 mt-3">
                <hr />
              </div>
            </div>
          </template>

          <div class="row justify-content-center mb-3 ">
            <div class="col-1 mr-4">
              <span
                style="display: none"
                class="switch switch-lg switch-outline switch-info switch-icon"
              >
                <label>
                  <input type="checkbox" />
                  <span></span>
                </label>
              </span>
            </div>
            <div class="col-8">
              <span class="form-text text-dark-50"
                >{{ selectedOptionsDelaySum }} {{ $t("total delivery days") }}
              </span>
            </div>
            <div class="col-sm-2 d-flex align-items-center"></div>
          </div>

          <div class="row justify-content-center mt-10">
            <div class="col-12">
              <hr />

              <button
                @click="orderSelectedOptions"
                class="btn btn-light-primary btn-lg btn-square btn-block font-weight-bold"
              >
                {{ $t("Order Now") }} ({{ selectedOptionsPriceSum }}
                {{ currency }})
              </button>
            </div>
          </div>

          <hr />

          <p class="text-center font-weight-bold m-0">
            {{ $t("Payment") }}
            <span class="text-success"
              ><i class="flaticon2-lock text-success" />
              {{ $t("Secured") }}</span
            >
            <br />
            <small>{{ $t("Your information is encrypted by SSL") }}</small>
          </p>
        </div>
      </div>

      <div class="card card-custom shadow-sm mb-5" v-if="comments.length > 0">
        <div class="card card-custom shadow-sm">
          <div class="card-header">
            <div class="card-title">
              <span
                class="svg-icon svg-icon-lg svg-icon-3x svg-icon-primary mr-3"
              >
                <!--begin::Svg Icon-->
                <inline-svg src="media/svg/icons/Communication/Chat4.svg" />
                <!--end::Svg Icon-->
              </span>

              <h3 class="card-label">
                {{ $t("Comments") }}
              </h3>
            </div>
          </div>

          <div class="card-body p-5">
            <div class="row justify-content-around">
              <div
                class="col-sm-12 col-md-5 card card-custom bg-success card-stretch"
              >
                <!--begin::Body-->
                <div class="card-body">
                  <span class="svg-icon svg-icon-lg svg-icon-3x svg-icon-white">
                    <!--begin::Svg Icon-->
                    <inline-svg src="media/svg/icons/General/Smile.svg" />
                    <!--end::Svg Icon-->
                  </span>
                  <span
                    class="font-weight-bolder text-white font-size-h1 mb-0 mt-6 d-block"
                  >
                    {{ positiveCommentsCount }}
                  </span>
                  <span class="font-weight-bold text-white font-size-sm">
                    {{ $t("Positive Comments") }}
                  </span>
                </div>
                <!--end::Body-->
              </div>

              <div
                class="col-sm-12 col-md-5 card card-custom bg-warning card-stretch"
              >
                <!--begin::Body-->
                <div class="card-body">
                  <span class="svg-icon svg-icon-lg svg-icon-3x svg-icon-white">
                    <!--begin::Svg Icon-->
                    <inline-svg src="media/svg/icons/General/Sad.svg" />
                    <!--end::Svg Icon-->
                  </span>
                  <span
                    class="font-weight-bolder text-white font-size-h1 mb-0 mt-6 d-block"
                  >
                    {{ negativeCommentsCount }}
                  </span>
                  <span class="font-weight-bold text-white font-size-sm">
                    {{ $t("Negative Comments") }}
                  </span>
                </div>
                <!--end::Body-->
              </div>
            </div>
            <hr />
            <div class="timeline timeline-3">
              <div class="timeline-items">
                <template v-for="comment of comments">
                  <div :key="comment.id" class="timeline-item">
                    <div class="timeline-media">
                      <img
                        alt="Pic"
                        :src="
                          comment.account.imageUrl !== null
                            ? comment.account.imageUrl
                            : 'media/user.png'
                        "
                      />
                    </div>
                    <div class="timeline-content">
                      <div
                        class="d-flex align-items-center justify-content-between mb-3"
                      >
                        <div class="mr-2">
                          <span
                            class="text-dark-75 text-hover-primary font-weight-bold"
                          >
                            {{ comment.account.firstName }}
                          </span>

                          <span
                            :class="[
                              'svg-icon mr-3',
                              comment.positive && 'svg-icon-success',
                              comment.negative && 'svg-icon-warning'
                            ]"
                          >
                            <!--begin::Svg Icon-->
                            <inline-svg
                              v-if="comment.positive"
                              src="media/svg/icons/General/Smile.svg"
                            />

                            <inline-svg
                              v-if="comment.negative"
                              src="media/svg/icons/General/Sad.svg"
                            />
                            <!--end::Svg Icon-->
                          </span>
                        </div>
                      </div>
                      <p class="p-0" v-html="comment.content"></p>
                      <span class="text-muted font-size-sm">
                        {{ comment.createdAt }}
                      </span>
                    </div>
                  </div>
                </template>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="col-sm-12 col-md-4">
      <div
        :class="[
          'card card-custom shadow-sm mb-5 d-md-block',
          hasOptions && 'd-sm-none'
        ]"
      >
        <div class="card-body p-5">
          <div>
            <h3 class="font-weight-bold">
              <span>Basic</span>
              <span class="text-primary float-right"
                >{{ basePrice }} {{ currency }}</span
              >
            </h3>
            <small class="font-weight-bold text-dark-50"
              >{{ service.delayDisplay }}
            </small>

            <p>{{ $t("Basic service without options") }}</p>
          </div>

          <div
            v-if="hasOptions"
            class="cursor-pointer"
            @click="scrollToOptions"
          >
            <hr />

            <div>
              <h3 class="font-weight-bold">
                <span>{{ $t("Custom Options") }}</span>
                <span class="text-primary float-right">
                  {{ basePrice }} {{ $t("to") }} {{ optionsSumPrice }}
                  {{ currency }}
                </span>
              </h3>
              <small class="font-weight-bold text-dark-50">
                {{ service.delay }} {{ $t("to") }} {{ optionsSumDelay }}
                {{ $t("delivery days") }}
              </small>

              <p
                v-html="
                  $t('You can choose among <strong>{number}</strong> options', {
                    number: service.optionsCount
                  })
                "
              ></p>
            </div>
          </div>

          <hr />

          <router-link
            :to="{ name: 'service-order', params: { id: service.id } }"
            v-slot="{ href, navigate, isActive, isExactActive }"
          >
            <a
              :href="href"
              @click="navigate"
              class="btn btn-light-primary btn-lg btn-square btn-block font-weight-bold"
            >
              {{ $t("Order Now") }} ({{ basePrice }} {{ currency }})
            </a>
          </router-link>

          <payment-secured />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { SET_BREADCRUMB } from "@/core/services/store/modules/breadcrumbs.module";
import { SET_HEAD_TITLE } from "@/core/services/store/modules/htmlhead.module";
import {
  queryServiceComments,
  queryServiceForDetail
} from "@/graphql/service-queries";
import { mapGetters } from "vuex";
import i18nService from "@/core/services/i18n.service";
import KTUtil from "@/assets/js/components/util";
import { UPDATE_PURCHASE_OPTIONS } from "@/core/services/store/modules/purchase.module";
import PaymentSecured from "@/view/pages/partials/PaymentSecured";

export default {
  name: "ServiceDetail",
  components: { PaymentSecured },
  comments: { PaymentSecured },
  data() {
    return {
      service: {},
      comments: [],
      positiveCommentsCount: 0,
      negativeCommentsCount: 0,
      options: [],
      totalPrice: 0,
      totalDelay: 0
    };
  },
  mounted() {},
  beforeMount() {
    this.fetchData();
  },
  computed: {
    ...mapGetters(["basePrice", "currency"]),
    selectedOptionsPriceSum() {
      return this.totalPrice.toLocaleString(i18nService.getActiveLanguage());
    },
    selectedOptionsDelaySum() {
      return this.totalDelay;
    },
    hasOptions() {
      if (this.service.options) {
        return this.service.options.length > 0;
      }

      return false;
    },

    optionsSumPrice() {
      let totalPrice = parseInt(this.service.basePrice);
      for (const option of this.service.options) {
        totalPrice += parseInt(option.price);
      }

      return totalPrice.toLocaleString(i18nService.getActiveLanguage());
    },
    optionsSumDelay() {
      let totalDelay = this.service.delay;
      for (const option of this.service.options) {
        totalDelay += parseInt(option.delay);
      }

      return totalDelay;
    }
  },
  watch: {
    options: function() {
      this.totalPrice = parseInt(this.service.basePrice);
      this.totalDelay = parseInt(this.service.delay);
      for (const id of this.options) {
        for (const option of this.service.options) {
          if (id === option.id) {
            this.totalPrice += parseInt(option.price);
            this.totalDelay += parseInt(option.delay);
          }
        }
      }
    }
  },
  methods: {
    async orderSelectedOptions() {
      await this.$store.dispatch(UPDATE_PURCHASE_OPTIONS, this.options);

      await this.$router.push({
        name: "service-order",
        params: { id: this.service.id }
      });
    },
    scrollToOptions() {
      KTUtil.scrollTo(this.$refs.additionalOptions, 0, 300);
    },
    clickCheckbox(id) {
      window.$("#checkbox-" + id).click();

      if (this.options.includes(id)) {
        window.$("#price-" + id).addClass("text-info");
      } else {
        window.$("#price-" + id).removeClass("text-info");
      }
    },
    fetchData() {
      this.fetchService();
      this.fetchServiceComments();
    },
    async fetchService() {
      const result = await this.$apollo.query({
        query: queryServiceForDetail,
        variables: {
          id: this.$route.params.id
        }
      });

      if (window._.isEmpty(result.errors)) {
        this.service = result.data.service;
        this.totalPrice = parseInt(result.data.service.basePrice);
        this.totalDelay = parseInt(result.data.service.delay);

        await this.$store.dispatch(SET_BREADCRUMB, [
          { title: this.service.title }
        ]);
        await this.$store.dispatch(SET_HEAD_TITLE, this.service.title);
      }
    },
    async fetchServiceComments() {
      const result = await this.$apollo.query({
        query: queryServiceComments,
        variables: {
          id: this.$route.params.id
        }
      });

      if (window._.isEmpty(result.errors)) {
        this.comments = result.data.service.comments;
        this.positiveCommentsCount = result.data.service.positiveCommentsCount;
        this.negativeCommentsCount = result.data.service.negativeCommentsCount;
      }
    }
  }
};
</script>
