<template>
  <div class="card card-custom">
    <!--begin::Header-->
    <div class="card-header card-header-tabs-line align-items-center px-4 py-3">
      <div class="flex-grow-1 ml-2">
        <div class="text-dark-75 font-weight-bold font-size-h5">
          {{ account.fullName }}
        </div>
        <div>
          <span class="label label-lg label-dot label-success mr-2"></span>
          <span class="font-weight-bold text-muted font-size-sm">Active</span>
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
            class="scroll scrol l-pull"
            style="height: 400px"
          >
            <!--begin::Messages-->
            <div class="messages mt-2 pb-3">
              <template v-for="message of chat">
                <div :key="message.id" class="">
                  <div class="text-center" v-if="message.showDate">
                    <span class="font-size-h5 text-dark-65 font-weight-bold">{{
                      message.date
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
                        'mt-2 p-2 font-weight-bold font-size-lg max-w-400px ',
                        message.fromCurrentAccount && 'bg-light text-dark-65',
                        !message.fromCurrentAccount && 'bg-dark text-white'
                      ]"
                    >
                      <div v-html="message.content"></div>
                      <span class="text-muted font-size-sm">{{
                        message.time
                      }}</span>
                    </div>
                  </div>
                </div>
              </template>
            </div>
            <!--end::Messages-->
          </div>
          <!--end::Scroll-->
        </div>

        <div
          style="max-height: 400px;min-height: 400px"
          :class="['tab-pane fade', isFilesTabActive && 'show active']"
          role="tabpanel"
        ></div>

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
          <button class="btn btn-clean btn-light btn-square btn-md mr-1">
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
      <!--begin::Compose-->
    </div>
    <!--end::Footer-->
  </div>
</template>

<script>
import PerfectScrollbar from "perfect-scrollbar";
import Quill from "quill";
import { queryPurchaseChat } from "@/graphql/purchase-queries";
import { createChatMessage } from "@/graphql/chat-mutations";
import { queryOrderChat } from "@/graphql/order-queries";

export default {
  name: "Chat",
  props: ["fromPurchase"],
  data() {
    return {
      chat: [],
      account: {},
      currentTabIndex: 0,
      messageContentQuill: {}
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
    }
  },
  beforeMount() {
    this.fetchChat();
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
        query = queryPurchaseChat;
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
      }
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
    },
    async sendChatMessage() {
      const submitButton = window.$("#btn_submit");
      submitButton.addClass("disabled spinner spinner-light spinner-right");

      let input = {};
      input.content = this.messageContentQuill.root.innerHTML;
      input.servicePurchase = this.$route.params.id;

      console.log(this.messageContentQuill.root.innerHTML);

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

      await this.fetchChat();
    },
    scrollToBottom() {
      const messagesContainer = document.querySelector("#messages-container");
      if (messagesContainer !== null) {
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
      }
    }
  }
};
</script>

<style scoped></style>
