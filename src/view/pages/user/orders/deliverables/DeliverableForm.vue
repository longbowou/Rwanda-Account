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
      <label class="col-sm-12 col-form-label font-weight-bold">Version</label>
      <b-form-select
        required
        v-model="input.version"
        :options="options"
        id="version"
        class="form-control form-control-lg"
      ></b-form-select>
    </div>

    <div class="form-group">
      <label class="col-sm-12 col-form-label font-weight-bold"
        >Description</label
      >
      <div id="content" style="height: 200px" v-html="contentHtml"></div>
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
import Quill from "quill";
import "select2";
import {
  queryDeliverable,
  queryDeliverableVersions
} from "@/graphql/deliverable-queries";
import {
  createDeliverable,
  updateDeliverable
} from "@/graphql/deliverable-mutations";

export default {
  name: "DeliverableForm",
  mixins: [formMixin, toastMixin],
  data() {
    return {
      deliverable: {},
      input: {},
      contentHtml: "",
      contentQuill: {},
      versionSelect2: {},
      deliverableVersions: []
    };
  },
  computed: {
    creating() {
      return this.$route.params.deliverableId === undefined;
    },
    updating() {
      return this.$route.params.deliverableId !== undefined;
    },
    options() {
      let options = [];
      for (const version of this.deliverableVersions) {
        options.push({ value: version.value, text: version.label });
      }
      return options;
    }
  },
  beforeMount() {
    if (this.updating) {
      this.fetchDeliverable();
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
      submitButton.addClass("disabled spinner spinner-light spinner-right");

      this.errors = [];
      this.input.description = this.contentQuill.root.innerHTML;
      this.input.version = this.versionSelect2.val();

      if (this.creating) {
        this.input.servicePurchase = this.$route.params.id;
      }

      let mutation = createDeliverable;
      if (this.updating) {
        mutation = updateDeliverable;
      }

      let result = await this.$apollo.mutate({
        mutation: mutation,
        variables: {
          input: this.input
        }
      });

      if (this.creating) {
        this.errors = result.data.createDeliverable.errors;
        this.deliverable = result.data.createDeliverable.deliverable;
      } else {
        this.errors = result.data.updateDeliverable.errors;
        this.deliverable = result.data.updateDeliverable.deliverable;
      }

      if (!window._.isEmpty(this.errors)) {
        submitButton.removeClass(
          "disabled spinner spinner-light spinner-right"
        );
        return;
      }

      submitButton.removeClass("disabled spinner spinner-light spinner-right");

      await this.$router.push({
        name: "orders-view",
        params: {
          id: this.$route.params.id
        }
      });

      let message = "Deliverable added successfully.";
      if (this.updating) {
        message = "Deliverable updated successfully.";
      }

      return this.notifySuccess(message);
    },
    async fetchDeliverable() {
      let result = await this.$apollo.query({
        query: queryDeliverable,
        variables: {
          id: this.$route.params.deliverableId
        },
        fetchPolicy: "no-cache"
      });

      if (window._.isEmpty(result.errors)) {
        this.deliverable = result.data.deliverable;

        this.input.id = this.deliverable.id;
        this.input.title = this.deliverable.title;
        this.input.version = this.deliverable.version;
        this.contentHtml = this.deliverable.description;
        this.input.published = this.deliverable.published;

        await this.$forceUpdate();
        this.initPlugins();
      }
    },
    initPlugins() {
      this.versionSelect2 = window.$("#version").select2();

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
    deliverableVersions: {
      query: queryDeliverableVersions,
      update: data => data.deliverableVersions
    }
  }
};
</script>
