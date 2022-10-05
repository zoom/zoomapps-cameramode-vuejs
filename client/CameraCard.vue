<!--
  Copyright (c) 2022 Zoom Video Communications, Inc.

  Permission is hereby granted, free of charge, to any person obtaining a copy
  of this software and associated documentation files (the "Software"), to deal
  in the Software without restriction, including without limitation the rights
  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  copies of the Software, and to permit persons to whom the Software is
  furnished to do so, subject to the following conditions:

  The above copyright notice and this permission notice shall be included in all
  copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
  SOFTWARE.
-->
<script>
import ErrorAlert from "./ErrorAlert.vue";

export default {
  components: { ErrorAlert },
  inject: ["zoomSdk", "config"],

  props: {
    media: {
      type: Object,
      default: null,
    },
  },

  data() {
    return {
      error: null,
      me: null,
      webviewId: "camera",
      drawParticipantZIndex: 1,
      drawWebViewZIndex: 2,
      postMessageValue: "",
    };
  },

  computed: {
    drawParticipantOptions() {
      const width = this.config?.media?.renderTarget?.width || 1280;
      const height = this.config?.media?.renderTarget?.height || 720;
      const options = {
        participantUUID: this.me?.participantUUID,
        x: 0,
        y: 0,
        width: parseInt(width),
        height: parseInt(height),
        zIndex: parseInt(this.drawParticipantZIndex),
      };
      return options;
    },
  },

  mounted() {
    this.zoomSdk
      .getUserContext()
      .then((c) => (this.me = c))
      .catch((err) => (this.error = err));
  },

  methods: {
    drawParticipant() {
      const options = this.drawParticipantOptions;
      this.zoomSdk.drawParticipant(options).catch((e) => (this.error = e));
    },
    clearParticipant() {
      this.zoomSdk
        .clearParticipant({
          participantUUID: this.me?.participantUUID,
        })
        .catch((e) => (this.error = e));
    },
    drawWebView() {
      const options = {
        webviewId: this.webviewId,
        x: 0,
        y: 0,
        width: this.config?.media?.renderTarget?.width || 1280,
        height: this.config?.media?.renderTarget?.height || 720,
        zIndex: parseInt(this.drawWebViewZIndex),
      };
      console.log("drawWebView", options);
      this.zoomSdk.drawWebView(options).catch((e) => (this.error = e));
    },
    clearWebView() {
      this.zoomSdk
        .clearWebView({
          webviewId: this.webviewId,
        })
        .catch((e) => (this.error = e));
    },
    postMessage() {
      this.zoomSdk
        .postMessage({ message: this.postMessageValue })
        .catch((e) => (this.error = e));
    },
    postMessageSetError() {
      this.zoomSdk
        .postMessage({ setError: null })
        .catch((e) => (this.error = e));
    },
  },
};
</script>

<template>
  <div id="CameraCard">
    <div class="card-title">Camera</div>
    <ErrorAlert :error="error" @close="error = null" />
    <div class="row">
      options:
      <pre>{{ drawParticipantOptions }}</pre>
    </div>
    <label class="row">
      <div class="col-3">zIndex:</div>
      <div class="col-5">
        <input v-model="drawParticipantZIndex" type="range" min="-2" max="5" />
      </div>
      <div class="col-4">
        <input
          v-model="drawParticipantZIndex"
          type="text"
          class="form-control"
        />
      </div>
    </label>
    <button class="btn btn-primary btn-sm" @click="drawParticipant">
      drawParticipant(options)
    </button>
    <button class="btn btn-warning btn-sm" @click="clearParticipant">
      clearParticipant({participantUUID: "{{ me?.participantUUID }}"})
    </button>
    <label class="row">
      <div class="col-3">zIndex:</div>
      <div class="col-5">
        <input v-model="drawWebViewZIndex" type="range" min="-2" max="5" />
      </div>
      <div class="col-4">
        <input v-model="drawWebViewZIndex" type="text" class="form-control" />
      </div>
    </label>
    <button class="btn btn-primary btn-sm" @click="drawWebView">
      drawWebView({webviewId: "{{ webviewId }}", zIndex:
      {{ drawWebViewZIndex }} })
    </button>
    <button class="btn btn-warning btn-sm" @click="clearWebView">
      clearWebView({webviewId: "{{ webviewId }}"})
    </button>
    <form @submit.prevent="postMessage">
      <label class="row">
        <div class="col-4">message:</div>
        <div class="col-8">
          <input
            v-model="postMessageValue"
            class="form-control"
            type="text"
            name="postMessageValue"
          />
        </div>
      </label>
      <button class="btn btn-warning btn-sm" @click="postMessage">
        postMessage({message: "{{ postMessageValue }}"})
      </button>
    </form>
    <button class="btn btn-primary btn-sm" @click="postMessageSetError">
      postMessage({setError: null})
    </button>
  </div>
</template>
