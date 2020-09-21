<template>
  <form class="form col-sm-9" @submit="onSubmit">
    <div class="form-group">
      <label class="col-sm-12 col-form-label font-weight-bold">Title</label>
      <b-form-input
        required
        :state="validateState('label')"
        v-model="input.label"
        class="form-control form-control-lg form-control-solid"
        type="text"
        placeholder="Title"
        min="0"
        autocomplete="off"
      />
      <b-form-invalid-feedback id="input-live-feedback">
        <p :key="message" v-for="message of errorMessages('label')">
          {{ message }}
        </p>
      </b-form-invalid-feedback>
    </div>

    <div class="form-group">
      <label class="col-sm-12 col-form-label font-weight-bold"
        >Description</label
      >
      <div
        id="description"
        style="height: 325px"
        v-html="descriptionHtml"
      ></div>
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
      <label class="col-sm-12 col-form-label font-weight-bold">Price</label>
      <b-form-input
        required
        v-model="input.price"
        class="form-control form-control-lg form-control-solid"
        type="number"
        placeholder="Number"
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
import { formMixin, toast } from "@/view/mixins";
import {
  createServiceOption,
  updateServiceOption
} from "@/graphql/service-mutations";
import _ from "lodash";
import Quill from "quill";
import "select2";
import { queryServiceOption } from "@/graphql/service-queries";

export default {
  name: "options-form",
  mixins: [formMixin, toast],
  props: ["serviceOptionId"],
  data() {
    return {
      service: {},
      serviceOption: {},
      input: {},
      descriptionHtml: "",
      descriptionQuill: {}
    };
  },
  computed: {
    creating() {
      return this.serviceOptionId === undefined;
    },
    updating() {
      return this.serviceOptionId !== undefined;
    }
  },
  beforeMount() {
    if (this.serviceOptionId !== undefined) {
      this.fetchServiceOption();
    }
  },
  mounted() {
    if (this.serviceOptionId === undefined) {
      this.initPlugins();
    }
  },
  methods: {
    async onSubmit(evt) {
      evt.preventDefault();

      const submitButton = window.$("#btn_submit");
      submitButton.addClass("spinner spinner-light spinner-right");

      this.errors = [];
      this.input.description = this.descriptionQuill.root.innerHTML;

      let mutation = createServiceOption;
      if (this.updating) {
        mutation = updateServiceOption;
      }

      let result = await this.$apollo.mutate({
        mutation: mutation,
        variables: {
          input: this.input
        }
      });

      if (this.creating) {
        this.errors = result.data.createServiceOption.errors;
      } else {
        this.errors = result.data.updateServiceOption.errors;
      }
      if (!_.isEmpty(this.errors)) {
        submitButton.removeClass("spinner spinner-light spinner-right");
        return;
      }

      submitButton.removeClass("spinner spinner-light spinner-right");

      await this.$router.push({
        name: "user-services-options"
      });

      let message = "Service option added successfully.";
      if (this.updating) {
        message = "Service option  updated successfully.";
      }

      return this.notifySuccess(message);
    },
    async fetchServiceOption() {
      if (this.serviceOptionId !== undefined) {
        let result = await this.$apollo.query({
          query: queryServiceOption,
          variables: {
            id: this.serviceOptionId
          },
          fetchPolicy: "no-cache"
        });

        if (_.isEmpty(result.errors)) {
          this.serviceOption = result.data.serviceOption;

          this.input.id = this.serviceOption.id;
          this.input.label = this.serviceOption.label;
          this.descriptionHtml = this.serviceOption.description;
          this.input.price = this.serviceOption.price;
          this.input.delay = this.serviceOption.delay;
          this.input.published = this.serviceOption.published;
          this.$route.params.id = this.serviceOption.service.id;

          await this.$forceUpdate();
          this.initPlugins();
        }
      }
    },
    initPlugins() {
      this.descriptionQuill = new Quill("#description", {
        modules: {
          toolbar: true
        },
        placeholder: "Content",
        theme: "snow"
      });
    }
  },
  apollo: {
    serviceOption: {
      query: queryServiceOption,
      update: data => data.serviceOption
    }
  }
};
</script>
