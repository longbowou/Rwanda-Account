!
<template>
  <form class="form col-sm-9" @submit="onSubmit">
    <div class="form-group">
      <label class="col-sm-12 col-form-label font-weight-bold">Title</label>
      <b-form-input
        required
        :state="validateState('label')"
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
        >Description</label
      >
      <div
        id="description"
        style="height: 325px"
        v-html="descriptionHtml"
      ></div>
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

<script>
import { formMixin, toastMixin } from "@/view/mixins";
import {
  createLitigation,
  handleLitigation
} from "@/graphql/service-mutations";
import Quill from "quill";
import { queryLitigation } from "@/graphql/service-queries";

export default {
  name: "LitigationForm",
  mixins: [formMixin, toastMixin],
  props: ["LitigationId"],
  data() {
    return {
      litigation: {},
      input: {},
      descriptionHtml: "",
      descriptionQuill: {}
    };
  },
  computed: {
    creating() {
      return this.$route.params.litigation === undefined;
    },
    updating() {
      return !this.creating;
    }
  },
  beforeMount() {
    if (this.updating) {
      this.fetchLitigation();
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
      submitButton.addClass("spinner spinner-light spinner-right");

      this.errors = [];
      this.input.description = this.descriptionQuill.root.innerHTML;
      if (this.creating) {
        this.input.servicePurchase = this.$route.params.id;
      }

      let mutation = createLitigation;
      if (this.updating) {
        mutation = handleLitigation;
      }

      let result = await this.$apollo.mutate({
        mutation: mutation,
        variables: {
          input: this.input
        }
      });

      if (this.creating) {
        this.errors = result.data.createLitigation.errors;
      } else {
        this.errors = result.data.handleLitigation.errors;
      }
      if (!window._.isEmpty(this.errors)) {
        submitButton.removeClass("spinner spinner-light spinner-right");
        return;
      }

      submitButton.removeClass("spinner spinner-light spinner-right");

      await this.$router.push({
        name: "order-deliverables-view"
      });

      let message = "Litigation added successfully.";
      if (this.updating) {
        message = "Litigation updated successfully.";
      }

      return this.notifySuccess(message);
    },
    async fetchLitigation() {
      let result = await this.$apollo.query({
        query: queryLitigation,
        variables: {
          id: this.$route.params.id
        },

        fetchPolicy: "no-cache"
      });

      if (window._.isEmpty(result.errors)) {
        this.litigation = result.data.litigation;

        this.input.id = this.litigation.id;
        this.input.title = this.litigation.title;
        this.descriptionHtml = this.litigation.description;
        this.input.servicePurchase = this.servicePurchase.id;

        await this.$forceUpdate();
        this.initPlugins();
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
  }
};
</script>
