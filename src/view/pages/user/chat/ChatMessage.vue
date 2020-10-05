<template>
  <div>
    <div class="text-center m-2" v-if="chatMessage.showDate">
      <span class="font-size-h5 text-dark-65 font-weight-bold">{{
        chatMessage.date
      }}</span>
    </div>
    <div
      :class="[
        'd-flex flex-column mb-0',
        chatMessage.fromCurrentAccount && 'align-items-end',
        !chatMessage.fromCurrentAccount && 'align-items-start'
      ]"
    >
      <div
        :class="[
          'mt-2 p-4 font-weight-bold font-size-lg max-w-400px ',
          chatMessage.fromCurrentAccount && 'bg-light text-dark-65',
          !chatMessage.fromCurrentAccount && 'bg-dark text-white'
        ]"
      >
        <div v-html="chatMessage.content" v-if="!chatMessage.isFile"></div>
        <div
          @click="downloadFile(chatMessage.fileName, chatMessage.fileUrl)"
          v-if="chatMessage.isFile"
          class="text-hover-success cursor-pointer"
        >
          <i class="fas fa-file-download mr-1"></i>
          {{ chatMessage.fileName }} <br />
          <p
            :class="[
              'm-0',
              chatMessage.fromCurrentAccount && 'text-right',
              !chatMessage.fromCurrentAccount && 'text-left'
            ]"
          >
            <span>{{ chatMessage.fileSize }}</span>
          </p>
        </div>
        <span class="text-muted font-size-sm">{{ chatMessage.time }}</span>
        <button
          :id="'btn-mark-' + chatMessage.id"
          class="btn btn-icon btn-xs btn-hover-text-warning float-right active ml-4"
          data-toggle="tooltip"
          data-placement="right"
          @click="markUnmarkChatMessage(chatMessage.id)"
          title="Mark"
          data-original-title="Star"
        >
          <i
            :id="'icon-star-' + chatMessage.id"
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
    return {
      chatMessage: window._.cloneDeep(this.message)
    };
  },
  computed: {
    markedClass() {
      return this.chatMessage.marked ? "text-success" : "text-muted";
    }
  },
  methods: {
    downloadFile(fileName, filUrl) {
      FileSaver.saveAs(filUrl, fileName);
    },
    async markUnmarkChatMessage(messageId) {
      const icon = window.$("#icon-star-" + messageId);
      icon.hide();

      const markButton = window.$("#btn-mark-" + messageId);
      markButton.attr("disabled", true);
      markButton.addClass("spinner spinner-success spinner-sm spinner-center");

      const result = await this.$apollo.mutate({
        mutation: markUnmarkChatMessage,
        variables: {
          chatMessage: messageId
        }
      });

      icon.show();
      markButton.removeAttr("disabled");
      markButton.removeClass(
        "spinner spinner-success spinner-sm spinner-center"
      );

      if (window._.isEmpty(result.errors)) {
        this.chatMessage.marked = result.data.markUnmarkChatMessage.marked;
      }
    }
  }
};
</script>

<style scoped></style>
