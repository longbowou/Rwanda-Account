<template>
  <div class="row">
    <div class="col-sm-8">
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
            src="media/books/img-72.jpg"
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
                  class="ml-3 label label-xl font-weight-bold text-dark-50 label-inline label-square mb-2"
                >
                  {{ keyword }}
                </span>
              </template>
            </span>
          </div>
        </div>
      </div>

      <div class="card card-custom shadow-sm" v-if="hasOptions">
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
              Customize the service
            </h3>
          </div>
        </div>

        <div class="card-body p-5">
          <div class="row">
            <div class="col-1 mr-4">
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
            <div class="col-9" ref="additionalOptions">
              <h2>{{ service.title }}</h2>
              <span class="form-text text-dark-50"
                >{{ service.delayDisplay }} delivery</span
              >
            </div>
          </div>
          <hr />
          <h3 class="mt-8 mb-8 text-info text-center">
            Additional options
          </h3>
          <template v-for="option of service.options">
            <div :key="option.id" class="row justify-content-center mb-3 ">
              <div class="col-1 mr-4">
                <span
                  class="switch switch-lg switch-outline switch-info switch-icon"
                >
                  <label>
                    <input
                      v-model="serviceCategories"
                      :id="'checkbox-' + option.id"
                      type="checkbox"
                      :value="option.id"
                    />
                    <span></span>
                  </label>
                </span>
              </div>
              <div
                class="col-8 cursor-pointer"
                @click="clickCheckbox(option.id)"
              >
                <h5>{{ option.label }}</h5>
                <span class="form-text text-dark-50">{{
                  option.delayPreviewDisplay
                }}</span>
              </div>
              <div
                @click="clickCheckbox(option.id)"
                class="col-sm-2 d-flex align-items-center cursor-pointer"
              >
                <h5 :id="'price-' + option.id">
                  {{ option.priceDisplay }} {{ currency }}
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
                >{{ selectedOptionsDelaySum }} total delivery days
              </span>
            </div>
            <div class="col-sm-2 d-flex align-items-center"></div>
          </div>

          <div class="row justify-content-center mt-10">
            <div class="col-12">
              <hr />

              <button
                @click="orderSelectedOptions"
                class="btn btn-light-dark btn-lg btn-square btn-block font-weight-bold"
              >
                Order Now ({{ selectedOptionsPriceSum }} {{ currency }})
              </button>
            </div>

            <div class="col-sm-8 mt-3">
              <p class="text-muted text-center">
                All prices are excluding VAT + 0.25 {{ currency }} and 3.4% fees
                may be charged by our banking partners depending on the VAT
                applied as well as the means of payment used.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="col-sm-4">
      <div class="card card-custom shadow-sm">
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

            <p>Basic service without options</p>
          </div>

          <div
            v-if="hasOptions"
            class="cursor-pointer"
            @click="scrollToOptions"
          >
            <hr />

            <div>
              <h3 class="font-weight-bold">
                <span>Custom Options</span>
                <span class="text-primary float-right"
                  >{{ basePrice }} to {{ optionsSumPrice }} {{ currency }}
                </span>
              </h3>
              <small class="font-weight-bold text-dark-50"
                >{{ service.delay }} to {{ optionsSumDelay }} delivery days
              </small>

              <p>
                You can choose among
                <strong>{{ service.optionsCount }}</strong> options
              </p>
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
              class="btn btn-light-dark btn-lg btn-square btn-block font-weight-bold"
            >
              Order Now
            </a>
          </router-link>

          <hr />

          <p class="text-center font-weight-bold m-0">
            Payment
            <span class="text-success"
              ><i class="flaticon2-lock text-success" /> Secured</span
            >
            <br />
            <small>Your information is encrypted by TLS</small>
          </p>
        </div>
      </div>

      <br />

      <user-card :user="service.account" />
    </div>
  </div>
</template>

<script>
import { SET_BREADCRUMB } from "@/core/services/store/modules/breadcrumbs.module";
import { SET_HEAD_TITLE } from "@/core/services/store/modules/htmlhead.module";
import { queryServiceForDetail } from "@/graphql/service-queries";
import { mapGetters } from "vuex";
import UserCard from "@/view/pages/partials/UserCard";
import i18nService from "@/core/services/i18n.service";
import KTUtil from "@/assets/js/components/util";
import { UPDATE_PURCHASE_OPTIONS } from "@/core/services/store/modules/purchase.module";

export default {
  name: "ServiceDetail",
  components: { UserCard },
  data() {
    return {
      service: {},
      serviceCategories: [],
      totalPrice: 0,
      totalDelay: 0
    };
  },
  mounted() {},
  beforeMount() {
    this.fetchService();
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
    serviceCategories: function() {
      this.totalPrice = parseInt(this.service.basePrice);
      this.totalDelay = parseInt(this.service.delay);
      for (const id of this.serviceCategories) {
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
      await this.$store.dispatch(
        UPDATE_PURCHASE_OPTIONS,
        this.serviceCategories
      );

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

      if (this.serviceCategories.includes(id)) {
        window.$("#price-" + id).addClass("text-info");
      } else {
        window.$("#price-" + id).removeClass("text-info");
      }
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
    }
  }
};
</script>
