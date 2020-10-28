<template>
  <form class="form col-sm-9" @submit="onSubmit">
    <div class="form-group">
      <label class="col-sm-12 col-form-label font-weight-bold">Title</label>
      <b-form-input
        required
        :state="validateState('title')"
        v-model="input.title"
        class="form-control form-control-lg form-control-solid"
        type="text"
        placeholder="Title"
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
      <div id="content" style="height: 200px" v-html="contentHtml"></div>
    </div>

    <div class="form-group">
      <label class="col-sm-12 col-form-label font-weight-bold">Category</label>
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
        >Delivery Delay (Days)</label
      >
      <b-form-input
        required
        v-model="input.delay"
        class="form-control form-control-lg form-control-solid"
        type="number"
        placeholder="Delivery Delay (Days)"
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
<style scoped>
.select2-selection {
  min-height: 36px;
}
</style>

<script>
import { formMixin, toastMixin } from "@/view/mixins";
import { createService, updateService } from "@/graphql/service-mutations";
import Quill from "quill";
import "select2";
import "@yaireo/tagify/dist/jQuery.tagify.min";
import {
  queryServiceCategories,
  queryServiceForEdit
} from "@/graphql/service-queries";
import { UPDATE_USER } from "@/core/services/store/modules/auth.module";

export default {
  name: "ServiceForm",
  mixins: [formMixin, toastMixin],
  props: ["serviceId"],
  data() {
    return {
      service: {},
      input: {},
      serviceCategories: [],
      contentHtml: "",
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
      return !this.creating;
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
    if (this.updating) {
      this.fetchService();
    }
  },
  mounted() {
    if (this.creating) {
      this.initPlugins();
    }
  },
  methods: {
    async onSubmit(evt) {
      evt.preventDefault();

      const submitButton = window.$("#btn_submit");
      submitButton.attr("disabled", true);
      submitButton.addClass("disabled spinner spinner-light spinner-right");

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

      submitButton.removeAttr("disabled");
      submitButton.removeClass("disabled spinner spinner-light spinner-right");

      if (this.creating) {
        this.errors = result.data.createService.errors;
      } else {
        this.errors = result.data.updateService.errors;
      }
      if (!window._.isEmpty(this.errors)) {
        return;
      }

      if (this.creating) {
        await this.$store.dispatch(UPDATE_USER, {
          account: result.data.createService.service.account
        });
      } else {
        await this.$store.dispatch(UPDATE_USER, {
          account: result.data.updateService.service.account
        });
      }

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
      let result = await this.$apollo.query({
        query: queryServiceForEdit,
        variables: {
          id: this.serviceId
        }
      });

      if (window._.isEmpty(result.errors)) {
        this.service = result.data.service;

        this.input.id = this.service.id;
        this.input.title = this.service.title;
        this.contentHtml = this.service.content;
        this.input.serviceCategory = this.service.serviceCategory.id;
        this.input.delay = this.service.delay;
        this.input.keywords = this.service.keywords;
        this.input.published = this.service.published;

        await this.$forceUpdate();
        this.initPlugins();
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

      this.keywordsTagify = window.$("#keywords").tagify({
        originalInputValueFormat: valuesArr =>
          valuesArr.map(item => item.value).join(",")
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
