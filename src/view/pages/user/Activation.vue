<template>
  <div class="">
    <div class="row">
      <div class="card col-sm-12 card-custom p-0">
        <div class="card-body d-flex p-0">
          <div
            class="flex-grow-1 p-20 pb-40 card-rounded flex-grow-1 bgi-no-repeat"
            style="background-position: calc(100% + 0.5rem) bottom;
            background-size: 25% auto;
            background-image: url(media/svg/illustrations/login-visual-5.svg)"
          >
            <h2 class="text-dark font-weight-bolder">
              <span v-if="message == null">
                {{ $t("Your account is being activated") }}
              </span>

              <span v-if="message !== null">
                {{ $t("Proceed as follow for your account activation") }}
              </span>
            </h2>

            <span id="spinner" class="m-10" v-if="message == null"></span>

            <div v-if="message !== null">
              <p class="text-dark-50 pb-5 font-size-h5" v-if="message !== null">
                {{ message }}
              </p>

              <button
                @click="$router.push({ name: 'signin' })"
                class="btn btn-success btn-square font-weight-bold py-2 px-6"
              >
                {{ $t("Login") }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss"></style>

<script>
import { SET_BREADCRUMB } from "@/core/services/store/modules/breadcrumbs.module";
import { SET_HEAD_TITLE } from "@/core/services/store/modules/htmlhead.module";
import { activateAccount } from "@/graphql/auth-mutations";

export default {
  name: "Activation",
  data() {
    return {
      message: null
    };
  },
  computed() {},
  mounted() {
    this.$store.dispatch(SET_BREADCRUMB, [
      { title: this.$t("Account Activation") }
    ]);
    this.$store.dispatch(SET_HEAD_TITLE, this.$t("Account Activation"));

    this.activate();
  },
  methods: {
    async activate() {
      const spinner = window.$("#spinner");
      spinner.addClass("spinner spinner-center spinner-success spinner-lg");

      const result = await this.$apollo.mutate({
        mutation: activateAccount,
        variables: {
          user: this.$route.params.id
        }
      });

      spinner.removeClass("spinner spinner-center spinner-success spinner-lg");

      this.message = result.data.activateAccount.message;
    }
  }
};
</script>
