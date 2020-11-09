<template>
  <div>
    <div
      class="alert alert-custom alert-notice alert-light-primary fade show m-0"
      role="alert"
    >
      <div class="alert-icon">
        <span class="svg-icon svg-icon-lg svg-icon-3x svg-icon-primary mr-3">
          <!--begin::Svg Icon-->
          <inline-svg src="media/svg/icons/Code/Info-circle.svg" />
          <!--end::Svg Icon-->
        </span>
      </div>
      <div
        class="alert-text text-justify font-weight-bold"
        v-html="
          $t(
            'You can write a <strong>positive or even negative</strong> comment.'
          )
        "
      ></div>
    </div>

    <div class="card card-custom shadow-sm mb-5 mt-5">
      <div class="card-header">
        <div class="card-title">
          <h3 class="card-label">
            {{ $t("Write a comment") }}
          </h3>
        </div>
      </div>

      <div class="card-body pt-2">
        <h3 class="text-center mt-3">{{ service.title }}</h3>

        <form class="form" @submit="onSubmit">
          <div class="form-group">
            <label class="col-sm-12 col-form-label font-weight-bold"
              >Content</label
            >
            <div id="content" style="height: 200px" v-html="contentHtml"></div>
          </div>

          <div class="form-group">
            <label class="col-sm-12 col-form-label font-weight-bold">
              Type
            </label>
            <b-form-select
              required
              v-model="input.type"
              :options="options"
              id="type"
              class="form-control form-control-lg"
            ></b-form-select>
          </div>

          <br />

          <div class="col-sm-12 text-center">
            <button
              id="btn_submit"
              class="col-sm-6 btn btn-light-primary btn-lg font-weight-bolder"
            >
              {{ $t("Submit") }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<style>
.select2-selection {
  min-height: 36px;
}
</style>

<script>
import Quill from "quill";
import "select2";
import { queryServiceCommentTypes } from "@/graphql/purchase-queries";
import { createServiceComment } from "@/graphql/purchase-mutations";
import { formMixin, toastMixin } from "@/view/mixins";

export default {
  name: "CommentCreate",
  props: ["service"],
  mixins: [formMixin, toastMixin],
  data() {
    return {
      input: {},
      contentHtml: "",
      contentQuill: {},
      typeSelect2: {},
      types: []
    };
  },
  mounted() {
    this.initPlugins();
  },
  computed: {
    options() {
      let options = [];
      for (const type of this.types) {
        options.push({ value: type.value, text: type.name });
      }
      return options;
    }
  },
  methods: {
    async onSubmit(evt) {
      evt.preventDefault();

      const submitButton = window.$("#btn_submit");
      submitButton.attr("disabled", true);
      submitButton.addClass("spinner spinner-light spinner-right");

      this.input.content = this.contentQuill.root.innerHTML;
      this.input.servicePurchase = this.$route.params.id;
      this.input.type = this.typeSelect2.val();

      let result = await this.$apollo.mutate({
        mutation: createServiceComment,
        variables: {
          input: this.input
        }
      });

      submitButton.removeAttr("disabled");
      submitButton.removeClass("disabled spinner spinner-light spinner-right");

      if (!window._.isEmpty(result.data.createServiceComment.errors)) {
        return;
      }

      this.$emit("comment-created");

      return this.notifySuccess(
        this.$t("Your comment has been successfully saved.")
      );
    },
    initPlugins() {
      this.typeSelect2 = window.$("#type").select2();

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
    types: {
      query: queryServiceCommentTypes,
      update: data => data.serviceCommentTypes
    }
  }
};
</script>
