<template>
  <div>
    <div
      class="alert alert-custom alert-notice alert-light-warning fade show m-0"
      role="alert"
    >
      <div class="alert-icon">
        <span class="svg-icon svg-icon-lg svg-icon-3x svg-icon-warning mr-3">
          <!--begin::Svg Icon-->
          <inline-svg src="media/svg/icons/Code/Info-circle.svg" />
          <!--end::Svg Icon-->
        </span>
      </div>
      <div class="alert-text text-justify font-weight-bold">
        You can ask an update by <strong>making an update request</strong>. If
        the seller accept it the <strong>deadline will be reset</strong>.
      </div>
    </div>

    <div class="card card-custom shadow-sm mb-5 mt-5">
      <div class="card-header">
        <div class="card-title">
          <h3 class="card-label">
            Make an update request
          </h3>
        </div>
      </div>

      <div class="card-body pt-2">
        <form class="form" @submit="onSubmit">
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
            <div
              id="description"
              style="height: 325px"
              v-html="contentHtml"
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
      </div>
    </div>
  </div>
</template>
<style scoped></style>

<script>
import { formMixin, toastMixin } from "@/view/mixins";
import Quill from "quill";
import { createServicePurchaseUpdateRequest } from "@/graphql/purchase-mutations";

export default {
  name: "UpdateRequestCreate",
  mixins: [formMixin, toastMixin],
  data() {
    return {
      input: {},
      contentHtml: "",
      contentQuill: {}
    };
  },
  mounted() {
    this.initPlugins();
  },
  methods: {
    async onSubmit(evt) {
      evt.preventDefault();

      const submitButton = window.$("#btn_submit");
      submitButton.attr("disabled", true);
      submitButton.addClass("spinner spinner-light spinner-right");

      this.input.content = this.contentQuill.root.innerHTML;
      this.input.servicePurchase = this.$route.params.id;

      let result = await this.$apollo.mutate({
        mutation: createServicePurchaseUpdateRequest,
        variables: {
          input: this.input
        }
      });

      submitButton.removeAttr("disabled");
      submitButton.removeClass("spinner spinner-light spinner-right");

      if (
        !window._.isEmpty(result.data.createServicePurchaseUpdateRequest.errors)
      ) {
        return;
      }

      this.$emit(
        "update-request-created",
        result.data.createServicePurchaseUpdateRequest
          .servicePurchaseUpdateRequest
      );

      return this.notifySuccess("Update request made successfully.");
    },
    initPlugins() {
      this.contentQuill = new Quill("#description", {
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
