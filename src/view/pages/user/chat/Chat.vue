<template>
  <div class="card card-custom">
    <!--begin::Header-->
    <div class="card-header card-header-tabs-line align-items-center px-4 py-3">
      <div class="flex-grow-1 ml-2">
        <div class="text-dark-75 font-weight-bold font-size-h5">
          {{ account.fullName }}
        </div>
        <div>
          <span
            :class="[
              'label label-lg label-dot mr-2',
              accountIsOnline && 'label-success',
              !accountIsOnline && 'label-dark'
            ]"
          ></span>
          <span class="font-weight-bold text-muted font-size-sm">
            {{ accountIsOnline ? "Active" : account.lastLogin }}
          </span>
        </div>
      </div>
      <div class="card-toolbar">
        <ul class="nav nav-tabs nav-tabs-line-success nav-bold nav-tabs-line">
          <li class="nav-item nav-primary">
            <button
              @click="setActiveTab(0)"
              :class="['nav-link', isMessagesTabActive && 'active']"
              data-toggle="tab"
              role="tab"
            >
              <span class="nav-icon"><i class="flaticon2-chat-1"></i></span>
              <span class="nav-text">Messages</span>
            </button>
          </li>
          <li class="nav-item ">
            <button
              @click="setActiveTab(1)"
              :class="['nav-link', isFilesTabActive && 'active']"
              data-toggle="tab"
              role="tab"
            >
              <span class="nav-icon"><i class="fas fa-file-alt"></i></span>
              <span class="nav-text">Files</span>
            </button>
          </li>
          <li class="nav-item nav-info">
            <button
              @click="setActiveTab(2)"
              :class="['nav-link', isStartsTabActive && 'active']"
              data-toggle="tab"
              role="tab"
            >
              <span class="nav-icon"><i class="flaticon-star"></i></span>
              <span class="nav-text">Stars</span>
            </button>
          </li>
        </ul>
      </div>
    </div>
    <!--end::Header-->

    <!--begin::Body-->
    <div class="card-body pt-0 pb-0">
      <div class="tab-content">
        <div
          :class="['tab-pane fade', isMessagesTabActive && 'show active']"
          role="tabpanel"
        >
          <!--begin::Scroll-->
          <div
            id="messages-container"
            class="scroll scroll-pull"
            style="height: 400px"
          >
            <!--begin::Messages-->
            <div class="messages mt-2 pb-3">
              <chat-message
                v-for="message of chat"
                :message="message"
                :key="message.id"
              />
            </div>
            <!--end::Messages-->
          </div>
          <!--end::Scroll-->
        </div>

        <div
          style="max-height: 400px;min-height: 400px"
          :class="['tab-pane fade', isFilesTabActive && 'show active']"
          role="tabpanel"
        >
          <!--begin::Scroll-->
          <div
            id="files-container"
            class="scroll scroll-pull"
            style="height: 400px"
          >
            <!--begin::Messages-->
            <div class="messages mt-2 pb-3">
              <chat-message
                v-for="message of files"
                :message="message"
                :key="message.id"
              />
            </div>
            <!--end::Messages-->
          </div>
          <!--end::Scroll-->
        </div>

        <div
          style="max-height: 400px;min-height: 400px"
          :class="['tab-pane fade', isStartsTabActive && 'show active']"
          role="tabpanel"
        ></div>
      </div>
    </div>
    <!--end::Body-->

    <!--begin::Footer-->
    <div class="card-footer align-items-center p-3">
      <!--begin::Compose-->
      <div style="height: 150px" id="message-content"></div>
      <div class="d-flex align-items-center justify-content-between mt-3">
        <div class="">
          <button
            id="btn-attach-file"
            @click="chooseFile"
            class="btn btn-clean btn-light btn-square btn-md mr-1"
          >
            <i class="fas fa-file-upload"></i>
            Attach a file
          </button>
        </div>
        <div>
          <button
            id="btn_submit"
            :disabled="messageContentIsEmpty"
            @click="sendChatMessage"
            type="button"
            class="btn btn-light-success btn-md btn-square font-weight-bold chat-send"
          >
            Send
          </button>
        </div>
      </div>

      <div class="d-flex align-items-center justify-content-between mt-3">
        <div class="col-sm-12 p-0">
          <div class="dropzone dropzone-multi" id="chat-file-upload-dropzone">
            <div class="dropzone-panel mb-lg-0 mb-2">
              <a id="attach-file" class="dropzone-select"> </a>
            </div>

            <div class="dropzone-items">
              <div class="dropzone-item" style="display: none">
                <div class="dropzone-file">
                  <div
                    class="dropzone-filename"
                    title="some_image_file_name.jpg"
                  >
                    <span data-dz-name class="mr-2"
                      >some_image_file_name.jpg</span
                    >
                    <strong>(<span data-dz-size>340kb</span>)</strong>
                    <div id="success-div" style="display: none">
                      <i class="ml-2 icon-lg text-success flaticon2-correct" />
                    </div>
                  </div>
                  <div class="dropzone-error" data-dz-errormessage></div>
                </div>
                <div class="dropzone-progress">
                  <div class="progress">
                    <div
                      class="progress-bar bg-primary"
                      role="progressbar"
                      aria-valuemin="0"
                      aria-valuemax="100"
                      aria-valuenow="0"
                      data-dz-uploadprogress
                    ></div>
                  </div>
                </div>
                <div class="dropzone-toolbar">
                  <span class="dropzone-delete" data-dz-remove
                    ><i class="flaticon2-cross"></i
                  ></span>
                </div>
              </div>
            </div>
          </div>
          <span class="form-text text-muted"
            >Max file size is <strong>1GB</strong> and max number of files is
            <strong>10</strong>.</span
          >
        </div>
      </div>
      <!--begin::Compose-->
    </div>
    <!--end::Footer-->
  </div>
</template>

<script>
import PerfectScrollbar from "perfect-scrollbar";
import Quill from "quill";
import {
  queryPurchaseChatFiles,
  queryPurchaseChatMessages
} from "@/graphql/purchase-queries";
import { createChatMessage } from "@/graphql/chat-mutations";
import { queryOrderChat } from "@/graphql/order-queries";
import JwtService from "@/core/services/jwt.service";
import { accountOnlineSubscription } from "@/graphql/account-subscriptions";
import Dropzone from "dropzone";
import { chatMessagesUploadUrl } from "@/core/server-side/urls";
import {
  chatFileSubscription,
  chatMessageSubscription
} from "@/graphql/chat-subscriptions";
import ChatMessage from "@/view/pages/user/chat/ChatMessage";

export default {
  name: "Chat",
  components: { ChatMessage },
  comments: { ChatMessage },
  props: ["fromPurchase"],
  data() {
    return {
      chat: [],
      files: [],
      account: {},
      currentTabIndex: 0,
      messageContentQuill: {},
      chatFileSubscriber: {}
    };
  },
  computed: {
    isMessagesTabActive() {
      return this.currentTabIndex === 0;
    },
    isFilesTabActive() {
      return this.currentTabIndex === 1;
    },
    isStartsTabActive() {
      return this.currentTabIndex === 2;
    },
    messageContentIsEmpty() {
      if (!window._.isEmpty(this.messageContentQuill)) {
        const messageContentText = this.messageContentQuill.getText().trim();
        return messageContentText.length === 0;
      }
      return true;
    },
    accountIsOnline() {
      if (window._.isEmpty(this.account)) {
        return false;
      }
      return this.account.isOnline;
    }
  },
  watch: {
    isFilesTabActive() {
      if (this.isFilesTabActive) {
        if (window._.isEmpty(this.files)) {
          this.fetchChatFiles();
        }

        if (window._.isEmpty(this.chatFileSubscriber)) {
          this.subscribeToChatFile();
        }
      }
    }
  },
  beforeMount() {
    this.fetchChat();
    this.subscribeToChatMessages();
  },
  mounted() {
    this.initPlugins();
  },
  updated() {
    this.scrollToBottom();
  },
  methods: {
    async fetchChat() {
      let query = queryOrderChat;
      if (this.fromPurchase) {
        query = queryPurchaseChatMessages;
      }

      const result = await this.$apollo.query({
        query: query,
        variables: {
          id: this.$route.params.id
        }
      });

      if (window._.isEmpty(result.errors)) {
        this.chat = result.data.servicePurchase.chat;
        if (this.fromPurchase) {
          this.account = result.data.servicePurchase.service.account;
        } else {
          this.account = result.data.servicePurchase.account;
        }

        this.subscribeToAccountOnline();
      }
    },
    async fetchChatFiles() {
      const result = await this.$apollo.query({
        query: queryPurchaseChatFiles,
        variables: {
          id: this.$route.params.id,
          isFile: true
        }
      });

      if (window._.isEmpty(result.errors)) {
        this.files = result.data.servicePurchase.chatFiles;
      }
    },
    subscribeToChatMessages() {
      const observer = this.$apollo.subscribe({
        query: chatMessageSubscription,
        variables: {
          authToken: JwtService.getAuth().token,
          servicePurchase: this.$route.params.id
        }
      });

      const $this = this;
      observer.subscribe({
        next(data) {
          if (data.data.chatMessageSubscription !== undefined) {
            $this.chat.push(data.data.chatMessageSubscription.message);
          }
        },
        error() {}
      });
    },
    subscribeToAccountOnline() {
      const observer = this.$apollo.subscribe({
        query: accountOnlineSubscription,
        variables: {
          authToken: JwtService.getAuth().token,
          account: this.account.id
        }
      });

      const $this = this;
      observer.subscribe({
        next(data) {
          if (data.data.accountOnlineSubscription !== undefined) {
            $this.account = data.data.accountOnlineSubscription.account;
          }
        },
        error() {}
      });
    },
    subscribeToChatFile() {
      const observer = this.$apollo.subscribe({
        query: chatFileSubscription,
        variables: {
          authToken: JwtService.getAuth().token,
          servicePurchase: this.$route.params.id
        }
      });

      const $this = this;
      this.chatFileSubscriber = observer.subscribe({
        next(data) {
          if (data.data.chatFileSubscription !== undefined) {
            $this.files.push(data.data.chatFileSubscription.message);
          }
        },
        error() {}
      });
    },
    setActiveTab(index) {
      this.currentTabIndex = index;
    },
    initPlugins() {
      this.messageContentQuill = new Quill("#message-content", {
        modules: {
          toolbar: true
        },
        placeholder: "Type a message",
        theme: "snow"
      });
      this.messageContentQuill.focus();

      new PerfectScrollbar("#messages-container", {
        suppressScrollX: true,
        wheelPropagation: false
      });

      new PerfectScrollbar("#files-container", {
        suppressScrollX: true,
        wheelPropagation: false
      });

      this.initFileUpload();
    },
    initFileUpload() {
      const id = "#chat-file-upload-dropzone";
      // set the preview element template
      const previewNode = window.$(id + " .dropzone-item");
      previewNode.id = "";
      const previewTemplate = previewNode.parent(".dropzone-items").html();
      previewNode.remove();

      Dropzone.autoDiscover = false;
      const chatFileDropzone = new Dropzone(id, {
        // Make the whole body a dropzone
        url: chatMessagesUploadUrl.replace(":pk", this.$route.params.id), // Set the url for your upload script location
        parallelUploads: 5,
        timeout: 3600000,
        maxFilesize: 1100, // Max filesize in MB
        previewTemplate: previewTemplate,
        previewsContainer: id + " .dropzone-items", // Define the container to display the previews
        clickable: id + " .dropzone-select", // Define the element that should be used as click trigger to select files.
        headers: {
          Authorization: "JWT " + JwtService.getAuth().token,
          "Cache-Control": null,
          "X-Requested-With": null
        }
      });

      chatFileDropzone.on("addedfile", function() {
        // Hookup the start button
        window
          .$(document)
          .find(id + " .dropzone-item")
          .css("display", "");
      });

      // Update the total progress bar
      chatFileDropzone.on("totaluploadprogress", function(progress) {
        window.$(id + " .progress-bar").css("width", progress + "%");
      });

      chatFileDropzone.on("sending", function() {
        // Show the total progress bar when upload starts
        window.$(id + " .progress-bar").css("opacity", "1");
      });

      // Hide the total progress bar when nothing's uploading anymore
      chatFileDropzone.on("complete", function() {
        var thisProgressBar = id + " .dz-complete";
        setTimeout(function() {
          window
            .$(
              thisProgressBar +
                " .progress-bar, " +
                thisProgressBar +
                " .progress"
            )
            .css("opacity", "0");
          window
            .$(thisProgressBar)
            .find("#success-div")
            .css("display", "block");
        }, 300);

        setTimeout(function() {
          window.$(thisProgressBar).remove();
        }, 1000);
      });
    },
    async sendChatMessage() {
      const submitButton = window.$("#btn_submit");
      submitButton.addClass("disabled spinner spinner-light spinner-right");

      let input = {};
      input.content = this.messageContentQuill.root.innerHTML;
      input.servicePurchase = this.$route.params.id;

      const result = await this.$apollo.mutate({
        mutation: createChatMessage,
        variables: {
          input: input
        }
      });

      submitButton.removeClass("disabled spinner spinner-light spinner-right");
      window.$("#btn_submit").blur();

      if (!window._.isEmpty(result.errors)) {
        return;
      }

      this.messageContentQuill.root.innerHTML = "";

      // await this.fetchChat();
    },
    chooseFile() {
      document.getElementById("attach-file").click();
      document.getElementById("btn-attach-file").blur();
    },
    scrollToBottom() {
      const messagesContainer = document.querySelector("#messages-container");
      if (messagesContainer !== null) {
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
      }

      const filesContainer = document.querySelector("#files-container");
      if (filesContainer !== null) {
        filesContainer.scrollTop = filesContainer.scrollHeight;
      }
    }
  }
};
</script>

<style scoped></style>
