<template>
  <div>
    <div
      class="alert alert-custom alert-notice alert-light-danger fade show m-0"
      role="alert"
    >
      <div class="alert-icon">
        <span class="svg-icon svg-icon-lg svg-icon-3x svg-icon-danger mr-3">
          <!--begin::Svg Icon-->
          <inline-svg src="media/svg/icons/Code/Info-circle.svg" />
          <!--end::Svg Icon-->
        </span>
      </div>
      <div
        class="alert-text text-justify font-weight-bold"
        v-html="
          $t(
            'You can open a litigation by <strong>filling the form bellow</strong>.<br>Administrators will <strong>handle</strong> it a soon as possible.'
          )
        "
      ></div>
    </div>

    <div class="card card-custom shadow-sm mb-5 mt-5">
      <div class="card-header">
        <div class="card-title">
          <h3 class="card-label">
            {{ $t("Open a litigation") }}
          </h3>
        </div>
      </div>

      <div class="card-body pt-2">
        <form class="form" @submit="onSubmit">
          <div class="form-group">
            <label class="col-sm-12 col-form-label font-weight-bold">{{
              $t("Title")
            }}</label>
            <b-form-input
              required
              :state="validateState('title')"
              v-model="input.title"
              class="form-control form-control-lg form-control-solid"
              type="text"
              :placeholder="$t('Title')"
              autocomplete="off"
            />
            <b-form-invalid-feedback id="input-live-feedback">
              <p :key="message" v-for="message of errorMessages('title')">
                {{ message }}
              </p>
            </b-form-invalid-feedback>
          </div>

          <div class="form-group">
            <label class="col-sm-12 col-form-label font-weight-bold">{{
              $t("Content")
            }}</label>
            <div
              id="description"
              style="height: 200px"
              v-html="contentHtml"
            ></div>
          </div>

          <br />

          <div class="col-sm-12 text-center">
            <button
              id="btn_submit"
              class="col-sm-6 btn btn-light-danger btn-lg font-weight-bolder"
            >
              {{ $t("Submit") }}
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
import { createLitigation } from "@/graphql/purchase-mutations";
import { directive as t } from "@intlify/vue-i18n-extensions";
import Quill from "quill";

export default {
  name: "LitigationCreate",
  mixins: [formMixin, toastMixin],
  directives: { t },
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

      const btn = window.$("#btn_submit");
      btn.attr("disabled", true);
      btn.addClass("spinner spinner-light spinner-right");

      this.input.content = this.contentQuill.root.innerHTML;
      this.input.servicePurchase = this.$route.params.id;

      let result = await this.$apollo.mutate({
        mutation: createLitigation,
        variables: {
          input: this.input
        }
      });

      btn.removeAttr("disabled");
      btn.removeClass("spinner spinner-light spinner-right");

      if (!window._.isEmpty(result.data.createLitigation.errors)) {
        return;
      }

      this.$emit("litigation-created", result.data.createLitigation.litigation);

      return this.notifySuccess(this.$t("Litigation opened."));
    },
    initPlugins() {
      this.contentQuill = new Quill("#description", {
        modules: {
          toolbar: true
        },
        placeholder: this.$t("Content"),
        theme: "snow"
      });
    }
  }
};
</script>
