<template>
  <form class="form col-sm-9" @submit="onSubmit">
    <div class="form-group">
      <label class="col-sm-12 col-form-label font-weight-bold">
        {{ $t("Label") }}
      </label>
      <b-form-input
        required
        :state="validateState('label')"
        v-model="input.label"
        class="form-control form-control-lg form-control-solid"
        type="text"
        :placeholder="$t('Label')"
        autocomplete="off"
      />
      <b-form-invalid-feedback id="input-live-feedback">
        <p :key="message" v-for="message of errorMessages('label')">
          {{ message }}
        </p>
      </b-form-invalid-feedback>
    </div>

    <div class="form-group">
      <label class="col-sm-12 col-form-label font-weight-bold">
        {{ $t("Additional Delivery Delay (Days)") }}
      </label>
      <b-form-input
        required
        v-model="input.delay"
        class="form-control form-control-lg form-control-solid"
        type="number"
        :placeholder="$t('Additional Delivery Delay (Days)')"
        min="0"
      />
    </div>

    <div class="form-group">
      <label class="col-sm-12 col-form-label font-weight-bold">
        {{ $t("Price") }}
      </label>
      <b-form-input
        required
        v-model="input.price"
        class="form-control form-control-lg form-control-solid"
        type="number"
        :placeholder="$t('Price')"
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
          {{ $t("Published") }}
        </label>
      </div>
    </div>

    <br />

    <div class="col-sm-12 text-center">
      <button
        id="btn_submit"
        class="col-sm-6 btn btn-success btn-lg font-weight-bolder"
      >
        {{ $t("Submit") }}
      </button>
    </div>
  </form>
</template>

<script>
import { formMixin, toastMixin } from "@/view/mixins";
import { queryServiceOption } from "@/graphql/service-options-queries";
import {
  createServiceOption,
  updateServiceOption
} from "@/graphql/service-options-mutations";

export default {
  name: "OptionForm",
  mixins: [formMixin, toastMixin],
  props: ["serviceOptionId"],
  data() {
    return {
      service: {},
      serviceOption: {},
      input: {}
    };
  },
  computed: {
    creating() {
      return this.$route.params.optionId === undefined;
    },
    updating() {
      return !this.creating;
    }
  },
  beforeMount() {
    if (this.updating) {
      this.fetchServiceOption();
    }
  },
  methods: {
    async onSubmit(evt) {
      evt.preventDefault();

      const btn = window.$("#btn_submit");
      btn.attr("disabled", true);
      btn.addClass("spinner spinner-light spinner-right");

      this.errors = [];
      if (this.creating) {
        this.input.service = this.$route.params.id;
      }

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

      btn.removeAttr("disabled");
      btn.removeClass("spinner spinner-light spinner-right");

      if (this.creating) {
        this.errors = result.data.createServiceOption.errors;
      } else {
        this.errors = result.data.updateServiceOption.errors;
      }

      if (!window._.isEmpty(this.errors)) {
        return;
      }

      await this.$router.push({
        name: "service-options"
      });

      let message = this.$t("Service option added successfully.");
      if (this.updating) {
        message = this.$t("Service option updated successfully.");
      }

      return this.notifySuccess(message);
    },
    async fetchServiceOption() {
      let result = await this.$apollo.query({
        query: queryServiceOption,
        variables: {
          id: this.$route.params.optionId
        },
        fetchPolicy: "no-cache"
      });

      if (window._.isEmpty(result.errors)) {
        this.serviceOption = result.data.serviceOption;

        this.input.id = this.serviceOption.id;
        this.input.label = this.serviceOption.label;
        this.input.price = this.serviceOption.price;
        this.input.delay = this.serviceOption.delay;
        this.input.published = this.serviceOption.published;

        await this.$forceUpdate();
        this.initPlugins();
      }
    }
  }
};
</script>
