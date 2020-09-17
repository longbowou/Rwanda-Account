<template>
  <form class="form col-sm-9" @submit="onSubmit">
    <div class="form-group">
      <label class="col-sm-12 col-form-label font-weight-bold">Title</label>
      <b-form-input
        required
        :state="validateState('serviceoptionSet{label}')"
        v-model="input.serviceOptions"
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
      <label class="col-sm-12 col-form-label font-weight-bold">Content</label>
      <div id="content" style="height: 325px" v-html="input.content"></div>
    </div>

    <div class="form-group">
      <label class="col-sm-12 col-form-label font-weight-bold">Category</label>
      <b-form-select
        required
        :value.sync="input.serviceCategory"
        :options="options"
        id="service-category"
        class="form-control form-control-lg"
      ></b-form-select>
    </div>

    <div class="form-group">
      <label class="col-sm-12 col-form-label font-weight-bold">Delay</label>
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
      <label class="col-sm-12 col-form-label font-weight-bold">Keywords</label>
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
</template>
<style>
.select2-selection {
  min-height: 36px;
}
</style>

<script>
import { formMixin, toastMixin } from "@/view/mixins";
import { createService, updateService } from "@/graphql/service-mutations";
import _ from "lodash";
import Quill from "quill";
import "select2";
import {
  queryService,
  queryServiceCategories
} from "@/graphql/service-queries";

export default {
  name: "service-form",
  mixins: [formMixin, toastMixin],
  props: ["serviceId"],
  data() {
    return {
      service: {},
      input: {},
      serviceCategories: [],
      contentQuill: {},
      serviceCategorySelect2: {},
      keywordsTagify: {}
    };
  },
  computed: {
    creating() {
      return this.serviceId === undefined;
    },
    updating() {
      return this.serviceId !== undefined;
    },
    options() {
      let options = [];
      for (const category of this.serviceCategories) {
        options.push({ value: category.id, text: category.label });
      }
      return options;
    }
  },
  beforeMount() {
    if (this.serviceId !== undefined) {
      this.fetchService();
    }
  },
  mounted() {
    if (this.serviceId === undefined) {
      this.initPlugins();
    }
  },
  methods: {
    async onSubmit(evt) {
      evt.preventDefault();

      const submitButton = window.$("#btn_submit");
      submitButton.addClass("spinner spinner-light spinner-right");

      this.errors = [];
      this.input.content = this.contentQuill.root.innerHTML;
      this.input.serviceCategory = this.serviceCategorySelect2.val();
      this.input.keywords = this.keywordsTagify.val();

      let mutation = createService;
      if (this.updating) {
        mutation = updateService;
      }

      let result = await this.$apollo.mutate({
        mutation: mutation,
        variables: {
          input: this.input
        }
      });

      if (this.creating) {
        this.errors = result.data.createService.errors;
      } else {
        this.errors = result.data.updateService.errors;
      }
      if (!_.isEmpty(this.errors)) {
        submitButton.removeClass("spinner spinner-light spinner-right");
        return;
      }

      submitButton.removeClass("spinner spinner-light spinner-right");

      await this.$router.push({
        name: "user-services"
      });

      let message = "Service added successfully.";
      if (this.updating) {
        message = "Service updated successfully.";
      }

      return this.notifySuccess(message);
    },
    async fetchService() {
      if (this.serviceId !== undefined) {
        let result = await this.$apollo.query({
          query: queryService,
          variables: {
            id: this.serviceId
          },
          fetchPolicy: "no-cache"
        });

        if (_.isEmpty(result.errors)) {
          this.service = result.data.service;

          this.input.id = this.service.id;
          this.input.title = this.service.title;
          this.input.content = this.service.content;
          this.input.serviceCategory = this.service.serviceCategory.id;
          this.input.delay = this.service.delay;
          this.input.keywords = this.service.keywords;
          this.input.published = this.service.published;

          await this.$forceUpdate();
          this.initPlugins();
        }
      }
    },
    initPlugins() {
      this.serviceCategorySelect2 = window.$("#service-category").select2();

      this.contentQuill = new Quill("#content", {
        modules: {
          toolbar: true
        },
        placeholder: "Content",
        theme: "snow"
      });
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
