<template>
  <div>
    <div class="row">
      <div class="col-sm-9">
        <div class="card card-custom shadow-sm">
          <div class="card-body p-0">
            <h2 class="card-label p-10 m-0">
              {{ service.title }}
            </h2>

            <img
              src="media/books/img-72.jpg"
              width="100%"
              height="400"
              style="object-fit: cover"
              alt=""
            />

            <div class="p-10" v-html="service.content"></div>
          </div>
        </div>
      </div>

      <div class="col-sm-3">
        <div class="card card-custom shadow-sm">
          <div class="card-body p-5">
            <h3 class="font-weight-bold">
              <span>Basic</span>
              <span class="text-primary float-right"
                >{{ basePrice }} {{ currency }}</span
              >
            </h3>
            <small class="font-weight-bold text-dark-50"
              >{{ service.delay }} days delivery
            </small>

            <p>Basic service without options</p>

            <hr />

            <button
              style="width: 100%"
              class="btn btn-light btn-lg btn-square btn-block font-weight-bold p-0 text-left"
            >
              <span
                style="width: 35%"
                class="btn btn-dark btn-lg btn-square font-weight-bold pl-1 pr-1"
              >
                {{ basePrice }} {{ currency }}
              </span>
              <span
                class="btn btn-light-dark btn-lg btn-square font-weight-bold"
                style="width: 65%"
              >
                Add to Card
              </span>
            </button>

            <br />
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

        <div class="card card-custom shadow-sm">
          <div class="card-body p-5">
            <a href="#" class="d-flex align-items-start mb-5">
              <div class="symbol symbol-40 symbol-lg-50 symbol-circle bg-light">
                <img alt="Pic" src="media/stock-600x600/img-11.jpg" />
              </div>
              <span class="text-dark-75 font-weight-bold ml-2">{{
                service.account.fullName
              }}</span>
            </a>

            <hr />

            <a
              href="#"
              class="btn btn-light btn-lg btn-square font-weight-bold pl-2 pr-2"
              style="width: 40%"
              >Contact</a
            >

            <a
              href="#"
              class="btn btn-light btn-lg btn-square font-weight-bold float-right pl-2 pr-2"
              style="width: 40%"
              >View Profile</a
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { SET_BREADCRUMB } from "@/core/services/store/modules/breadcrumbs.module";
import { SET_HEAD_TITLE } from "@/core/services/store/modules/htmlhead.module";
import { queryService } from "@/graphql/service-queries";
import _ from "lodash";
import { mapGetters } from "vuex";

export default {
  name: "service-detail",
  components: {},
  data() {
    return {
      service: {}
    };
  },
  mounted() {
    window.scrollTo(0, 0);
  },
  beforeMount() {
    this.fetchService(this.$route.params.id);
  },
  computed: {
    ...mapGetters(["basePrice", "currency"])
  },
  methods: {
    async fetchService(id) {
      var result = await this.$apollo.query({
        query: queryService,
        variables: {
          id: id
        }
      });

      if (_.isEmpty(result.errors)) {
        this.service = result.data.service;

        await this.$store.dispatch(SET_BREADCRUMB, [
          { title: this.service.serviceCategory.label }
        ]);
        await this.$store.dispatch(SET_HEAD_TITLE, this.service.title);
      }
    }
  }
};
</script>
