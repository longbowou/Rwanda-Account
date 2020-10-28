<template>
  <div>
    <div
      class="alert alert-custom alert-notice alert-light-dark fade show m-0"
      role="alert"
    >
      <div class="alert-icon">
        <span class="svg-icon svg-icon-lg svg-icon-3x svg-icon-dark mr-3">
          <!--begin::Svg Icon-->
          <inline-svg src="media/svg/icons/Code/Info-circle.svg" />
          <!--end::Svg Icon-->
        </span>
      </div>
      <div class="alert-text text-justify font-weight-bold">
        You can ask write a <strong>positive or even negative</strong> comment.
      </div>
    </div>

    <div class="card card-custom shadow-sm mb-5 mt-5">
      <div class="card-header">
        <div class="card-title">
          <h3 class="card-label">
            Write a comment
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
            <div id="content" style="height: 325px" v-html="contentHtml"></div>
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
              class="col-sm-6 btn btn-light-dark btn-lg font-weight-bolder"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<style scoped>
.select2-selection {
  min-height: 36px;
}
</style>

<script>
import Quill from "quill";
import "select2";

export default {
  name: "CommentCreate",
  props: ["service"],
  data() {
    return {
      input: {},
      contentHtml: "",
      contentQuill: {},
      typeSelect2: {}
    };
  },
  mounted() {
    this.initPlugins();
  },
  methods: {
    async onSubmit(evt) {
      evt.preventDefault();
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
  }
};
</script>
