<template>
  <div>
    <div class="text-center m-2" v-if="message.showDate">
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
      </div>
    </div>
  </div>
</template>

<script>
import FileSaver from "file-saver";

export default {
  name: "ChatMessage",
  props: ["message"],
  methods: {
    downloadFile(fileName, filUrl) {
      FileSaver.saveAs(filUrl, fileName);
    }
  }
};
</script>

<style scoped></style>
