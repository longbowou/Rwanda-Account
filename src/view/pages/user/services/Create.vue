<template>
  <div>
    <!--begin::Dashboard-->
    <div class="row justify-content-center">
      <div class="col-md-12">
        <!--begin::Card-->
        <div class="card card-custom gutter-b">
          <div class="card-header">
            <div class="card-title">
              <span class="svg-icon svg-icon-lg svg-icon-3x svg-icon-primary">
                <!--begin::Svg Icon-->
                <inline-svg src="media/svg/icons/Shopping/Box2.svg" />
                <!--end::Svg Icon-->
              </span>
              <h3 class="card-label">Add a Service</h3>
            </div>
          </div>
          <div class="card-body">
            <div class="row justify-content-center">
              <form class="form col-sm-9" @submit="onSubmit">
                <div class="form-group">
                  <label class="col-sm-12 col-form-label font-weight-bold"
                    >Title</label
                  >
                  <b-form-input
                    required
                    :state="validateState('title')"
                    v-model="input.title"
                    class="form-control form-control-lg form-control-solid"
                    type="text"
                    placeholder="Title"
                    min="0"
                    autocomplete="off"
                  />
                  <b-form-invalid-feedback id="input-live-feedback">
                    <p :key="message" v-for="message of errorMessages('title')">
                      {{ message }}
                    </p>
                  </b-form-invalid-feedback>
                </div>

                <div class="form-group">
                  <label class="col-sm-12 col-form-label font-weight-bold"
                    >Content</label
                  >
                  <div id="content" style="height: 325px"></div>
                </div>

                <div class="form-group">
                  <label class="col-sm-12 col-form-label font-weight-bold"
                    >Category</label
                  >
                  <b-form-select
                    required
                    v-model="input.serviceCategory"
                    :options="options"
                    id="service-category"
                    class="form-control form-control-lg"
                  ></b-form-select>
                </div>

                <div class="form-group">
                  <label class="col-sm-12 col-form-label font-weight-bold"
                    >Delay</label
                  >
                  <b-form-input
                    required
                    v-model="input.delay"
                    class="form-control form-control-lg form-control-solid"
                    type="number"
                    placeholder="Number"
                    min="0"
                  />
                </div>

                <div class="form-group">
                  <label class="col-sm-12 col-form-label font-weight-bold"
                    >Keywords</label
                  >
                  <b-form-input
                    v-model="input.keywords"
                    id="keywords"
                    class="form-control form-control-lg form-control-solid"
                    type="text"
                    placeholder="Keywords"
                    min="0"
                  />
                </div>

                <div class="form-group">
                  <div class="col-sm-12 checkbox-inline p-0">
                    <label class="checkbox checkbox-square checkbox-lg">
                      <input
                        v-model="input.published"
                        class="form-control form-control-lg checkbox"
                        type="checkbox"
                      />
                      <span></span>
                      Published
                    </label>
                  </div>
                </div>

                <br />

                <div class="col-sm-12 text-center">
                  <button
                    id="btn_submit"
                    class="col-sm-6 btn btn-success btn-lg font-weight-bolder"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <!--end::Card-->
      </div>
    </div>
    <!--end::Dashboard-->
  </div>
</template>
<style>
.select2-selection {
  min-height: 36px;
}
</style>

<script>
import { SET_BREADCRUMB } from "@/core/services/store/modules/breadcrumbs.module";
import { SET_HEAD_TITLE } from "@/core/services/store/modules/htmlhead.module";
import { mapGetters } from "vuex";
import { formMixin, toast } from "@/view/mixins";
import { createService } from "@/graphql/service-mutations";
import _ from "lodash";
import Quill from "quill";
import "select2";
import "@yaireo/tagify/dist/jQuery.tagify.min";
import { queryServiceCategories } from "@/graphql/service-queries";

export default {
  name: "user-services-create",
  mixins: [formMixin, toast],
  data() {
    return {
      serviceCategories: [],
      input: {
        serviceCategory: null
      },
      quill: {},
      serviceCategory: {}
    };
  },
  computed: {
    ...mapGetters(["currentAccount", "currency"]),
    options() {
      let options = [];
      for (const category of this.serviceCategories) {
        options.push({ value: category.id, text: category.label });
      }
      return options;
    }
  },
  mounted() {
    this.$store.dispatch(SET_BREADCRUMB, [{ title: "Add a Service" }]);
    this.$store.dispatch(SET_HEAD_TITLE, "Add a Service");

    this.serviceCategory = window.$("#service-category").select2();

    this.quill = new Quill("#content", {
      modules: {
        toolbar: true
      },
      placeholder: "Content",
      theme: "snow"
    });

    window.$("#keywords").tagify();
  },
  methods: {
    async onSubmit(evt) {
      evt.preventDefault();

      const submitButton = window.$("#btn_submit");
      submitButton.addClass("spinner spinner-light spinner-right");

      this.errors = [];
      this.input.content = this.quill.root.innerHTML;
      this.input.serviceCategory = this.serviceCategory.val();

      let result = await this.$apollo.mutate({
        mutation: createService,
        variables: {
          input: this.input
        }
      });

      this.errors = result.data.createService.errors;
      if (!_.isEmpty(this.errors)) {
        submitButton.removeClass("spinner spinner-light spinner-right");
        return;
      }

      submitButton.removeClass("spinner spinner-light spinner-right");

      await this.$router.push({
        name: "user-services"
      });

      return this.notifySuccess("Service added successfully.");
    }
  },
  apollo: {
    serviceCategories: {
      query: queryServiceCategories,
      update: data => data.serviceCategories
    }
  }
};
</script>
