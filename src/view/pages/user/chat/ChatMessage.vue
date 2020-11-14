<template>
  <div>
    <div class="text-center m-2" v-if="message.showDate">
      <span class="font-size-h5 text-dark-65 font-weight-bold">{{
        message.dateDisplay
      }}</span>
    </div>
    <div
      :class="[
        'd-flex flex-column mb-0',
        message.fromCurrentAccount && 'align-items-end',
        !message.fromCurrentAccount && 'align-items-start'
      ]"
    >
      <div
        :class="[
          'mt-2 p-4 font-weight-bold font-size-lg max-w-400px ',
          message.fromCurrentAccount && 'bg-light text-dark-65',
          !message.fromCurrentAccount && 'bg-dark text-white'
        ]"
      >
        <div v-html="message.content" v-if="!message.isFile"></div>

        <div
          @click="downloadFile(message.fileName, message.fileUrl)"
          v-if="message.isFile"
          class="text-hover-success cursor-pointer"
        >
          <i class="fas fa-file-download mr-1"></i>
          {{ message.fileName }} <br />
          <p
            :class="[
              'm-0',
              message.fromCurrentAccount && 'text-right',
              !message.fromCurrentAccount && 'text-left'
            ]"
          >
            <span>{{ message.fileSize }}</span>
          </p>
        </div>
        <span class="text-muted font-size-sm">{{ message.time }}</span>
        <button
          :ref="'btn-mark-' + message.id"
          :class="[
            'btn btn-icon btn-xs btn-hover-text-warning float-right active ml-4'
          ]"
          data-toggle="tooltip"
          data-placement="right"
          @click="markUnmarkChatMessage(message.id)"
          title="Mark"
          data-original-title="Star"
        >
          <i
            :ref="'icon-star-' + message.id"
            :class="['flaticon-star', markedClass]"
          ></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import FileSaver from "file-saver";
import { markUnmarkChatMessage } from "@/graphql/chat-mutations";

export default {
  name: "ChatMessage",
  props: ["message"],
  data() {
    return {};
  },
  computed: {
    markedClass() {
      return this.message.marked ? "text-success" : "text-muted";
    },
    showDate() {
      return this.message.showDate;
    }
  },
  methods: {
    downloadFile(fileName, filUrl) {
      FileSaver.saveAs(filUrl, fileName);
    },
    async markUnmarkChatMessage(messageId) {
      const icon = window.$(this.$refs["icon-star-" + messageId]);
      icon.hide();

      const btn = window.$(this.$refs["btn-mark-" + messageId]);
      btn.attr("disabled", true);
      btn.addClass("spinner spinner-success spinner-sm spinner-center");

      const result = await this.$apollo.mutate({
        mutation: markUnmarkChatMessage,
        variables: {
          chatMessage: messageId
        }
      });

      icon.show();
      btn.removeAttr("disabled");
      btn.removeClass("spinner spinner-success spinner-sm spinner-center");

      if (window._.isEmpty(result.errors)) {
        this.message.marked = result.data.markUnmarkChatMessage.marked;

        this.$emit("chat-message-updated", window._.cloneDeep(this.message));
      }
    }
  }
};
</script>

<style scoped></style>
