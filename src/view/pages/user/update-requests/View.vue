<template>
  <div>
    <div
      v-if="fromPurchase && updateRequest.initiated"
      class="alert alert-custom alert-notice alert-light-warning fade show m-0 mb-5"
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
        You ask an update. Please wait the seller
        <strong>answer</strong> for your update request.
      </div>
    </div>

    <div
      v-if="!fromPurchase && updateRequest.initiated"
      class="alert alert-custom alert-notice alert-light-warning fade show m-0 mb-5"
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
        <h5>Action Required</h5>
        An update request has been made by the buyer. <br />
        You must <strong>accept or refuse</strong> the update request to
        continue the process of purchasing the service. <br />
      </div>
    </div>

    <div class="card card-custom shadow-sm mb-5">
      <div class="card-header">
        <div class="card-title">
          <h3 class="card-label">
            Update request
          </h3>

          <span
            :class="[
              'ml-3 label label-xl font-weight-bold label-inline label-square',
              updateRequest.initiated && 'label-dark',
              updateRequest.accepted && 'label-primary',
              updateRequest.delivered && 'label-warning',
              updateRequest.refused && 'label-danger'
            ]"
          >
            {{ updateRequest.status }}
          </span>
        </div>

        <div class="card-toolbar">
          <button
            ref="btnAccept"
            @click="accept"
            v-if="updateRequest.canBeAccepted"
            title="Accept"
            class="btn btn-lg btn-icon btn-light-success mr-2"
          >
            <i class="fas fa-check"></i>
          </button>

          <button
            ref="btnDeliver"
            @click="deliver"
            v-if="updateRequest.canBeDelivered"
            data-toggle="tooltip"
            title="Approve"
            class="btn btn-lg btn-icon btn-light-success mr-2"
          >
            <i class="fas fa-check-double"></i>
          </button>

          <button
            ref="btnRefuse"
            @click="refuse"
            v-if="updateRequest.canBeRefused"
            data-toggle="tooltip"
            title="Cancel"
            class="btn btn-lg btn-icon btn-light-danger"
          >
            <i class="flaticon2-cancel"></i>
          </button>
        </div>
      </div>

      <div class="card-body pt-2">
        <h3>{{ updateRequest.title }}</h3>

        <div v-html="updateRequest.content"></div>
      </div>

      <div class="card-footer pt-4 pb-4" v-if="updateRequest.accepted">
        <h6 class="text-dark-65 m-0">
          Deadline
          <span class="text-primary">{{ updateRequest.deadlineAt }}</span>
        </h6>
      </div>
    </div>
  </div>
</template>

<script>
import {
  acceptServicePurchaseUpdateRequest,
  deliverServicePurchaseUpdateRequest,
  refuseServicePurchaseUpdateRequest
} from "@/graphql/order-mutations";
import { toastMixin } from "@/view/mixins";

export default {
  name: "UpdateRequestView",
  props: ["updateRequest", "fromPurchase"],
  mixins: [toastMixin],
  methods: {
    async accept() {
      const title =
        "Do you really want to accept the update request " +
        this.updateRequest.title +
        " ?";

      if (!confirm(title)) {
        return;
      }

      window.$(this.$refs.btnAccept).removeClass("btn-light-success");
      window
        .$(this.$refs.btnAccept)
        .addClass("btn-light disabled spinner spinner-success spinner-right");
      window.$(this.$refs.btnAccept).attr("disabled", "");
      window
        .$(this.$refs.btnAccept)
        .find("i")
        .css("display", "none");

      let result = await this.$apollo.mutate({
        mutation: acceptServicePurchaseUpdateRequest,
        variables: {
          input: { id: this.updateRequest.id }
        }
      });

      window.$(this.$refs.btnAccept).addClass("btn-light-success");
      window.$(this.$refs.btnAccept).removeAttr("disabled");
      window
        .$(this.$refs.btnAccept)
        .removeClass(
          "btn-light disabled spinner spinner-success spinner-right"
        );
      window
        .$(this.$refs.btnAccept)
        .find("i")
        .css("display", "");

      if (
        !window._.isEmpty(result.data.acceptServicePurchaseUpdateRequest.errors)
      ) {
        return;
      }

      this.notifySuccess("Update request accepted successfully.");

      this.$emit(
        "update-request-updated",
        result.data.acceptServicePurchaseUpdateRequest
          .servicePurchaseUpdateRequest
      );
    },
    async refuse() {
      const title =
        "Do you really want to refuse the update request " +
        this.updateRequest.title +
        " ?";

      if (!confirm(title)) {
        return;
      }

      window.$(this.$refs.btnRefuse).removeClass("btn-light-danger");
      window
        .$(this.$refs.btnRefuse)
        .addClass("btn-light disabled spinner spinner-success spinner-right");
      window.$(this.$refs.btnRefuse).attr("disabled", "");
      window
        .$(this.$refs.btnRefuse)
        .find("i")
        .css("display", "none");

      let result = await this.$apollo.mutate({
        mutation: refuseServicePurchaseUpdateRequest,
        variables: {
          input: { id: this.updateRequest.id }
        }
      });

      window.$(this.$refs.btnRefuse).addClass("btn-light-success");
      window.$(this.$refs.btnRefuse).removeAttr("disabled");
      window
        .$(this.$refs.btnRefuse)
        .removeClass(
          "btn-light disabled spinner spinner-success spinner-right"
        );
      window
        .$(this.$refs.btnRefuse)
        .find("i")
        .css("display", "");

      if (
        !window._.isEmpty(result.data.refuseServicePurchaseUpdateRequest.errors)
      ) {
        return;
      }

      this.notifySuccess("Update request refused successfully.");

      this.$emit(
        "update-request-updated",
        result.data.refuseServicePurchaseUpdateRequest
          .servicePurchaseUpdateRequest
      );
    },
    async deliver() {
      const title =
        "Do you really want to mark as deliver the update request " +
        this.updateRequest.title +
        " ?";

      if (!confirm(title)) {
        return;
      }

      window.$(this.$refs.btnDeliver).removeClass("btn-light-danger");
      window
        .$(this.$refs.btnDeliver)
        .addClass("btn-light disabled spinner spinner-success spinner-right");
      window.$(this.$refs.btnDeliver).attr("disabled", "");
      window
        .$(this.$refs.btnDeliver)
        .find("i")
        .css("display", "none");

      let result = await this.$apollo.mutate({
        mutation: deliverServicePurchaseUpdateRequest,
        variables: {
          input: { id: this.updateRequest.id }
        }
      });

      window.$(this.$refs.btnDeliver).addClass("btn-light-success");
      window.$(this.$refs.btnDeliver).removeAttr("disabled");
      window
        .$(this.$refs.btnDeliver)
        .removeClass(
          "btn-light disabled spinner spinner-success spinner-right"
        );
      window
        .$(this.$refs.btnDeliver)
        .find("i")
        .css("display", "");

      if (
        !window._.isEmpty(
          result.data.deliverServicePurchaseUpdateRequest.errors
        )
      ) {
        return;
      }

      this.notifySuccess("Update request mark as deliver successfully.");

      this.$emit(
        "update-request-updated",
        result.data.deliverServicePurchaseUpdateRequest
          .servicePurchaseUpdateRequest
      );
    }
  }
};
</script>

<style scoped></style>
