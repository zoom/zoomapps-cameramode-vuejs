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
<template>
  <div id="CameraMode">
    <h1>camera mode</h1>
    <ErrorAlert :error="error" @close="error = null" />
    <div
      class="lower-third"
      :class="{ hide: !lowerThirdText || closingLowerThird }"
    >
      {{ lowerThirdText }}
    </div>
  </div>
</template>

<script>
import ErrorAlert from "./ErrorAlert.vue";

export default {
  components: { ErrorAlert },
  inject: ["zoomSdk", "config"],

  data() {
    return {
      error: null,
      me: {},
      lowerThirdText: "",
      closingLowerThird: false,
    };
  },

  mounted() {
    this.zoomSdk
      .getUserContext()
      .then((c) => {
        this.me = c; // need the participant id for drawParticipant
        this.drawParticipant();
        this.drawWebView();
      })
      .catch((err) => (this.error = err));
    this.zoomSdk.addEventListener("onMessage", this.onMessage);
  },

  unmounted() {
    this.zoomSdk.removeEventListener("onMessage", this.onMessage);
  },

  methods: {
    onMessage(evt) {
      const payload = JSON.parse(evt.payload);

      if (payload.setError !== undefined) {
        this.onMessageSetError(payload);
      } else if (payload.message !== undefined) {
        this.onMessageLowerThird(payload);
      }
    },

    onMessageLowerThird(payload) {
      const message = payload.message;
      if (message === "") {
        this.closingLowerThird = true;
        window.setTimeout(this.onCloseMessage, 500);
      } else {
        this.lowerThirdText = message;
      }
    },

    onMessageSetError(payload) {
      this.error = payload.setError;
    },

    onCloseMessage() {
      this.lowerThirdText = "";
      this.closingLowerThird = false;
    },

    drawParticipant() {
      this.zoomSdk
        .drawParticipant({
          participantUUID: this.me?.participantUUID,
          x: 0,
          y: 0,
          width: this.config.media.renderTarget.width,
          height: this.config.media.renderTarget.height,
          zIndex: 1,
        })
        .catch((e) => (this.error = e));
    },

    drawWebView() {
      this.zoomSdk
        .drawWebView({
          webviewId: "camera",
          x: 0,
          y: 0,
          width: this.config.media.renderTarget.width,
          height: this.config.media.renderTarget.height,
          zIndex: 2,
        })
        .catch((e) => (this.error = e));
    },
  },
};
</script>

<style>
body {
  background-color: rgba(0, 0, 0, 0);
}
#CameraMode {
  position: absolute;
  display: flex;
  justify-content: center;
  color: #ffffff;
  width: 100%;
  height: 100%;
}

#CameraMode h1 {
  color: #fff;
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 30%);
}

#CameraMode .lower-third {
  color: #fff;
  background-color: rgba(0, 0, 0, 30%);
  font-size: 12vh;
  position: absolute;
  bottom: 0;
  padding: 5%;
  margin: 0 0 5% 0;
  border-radius: 1rem;

  transition: all 1000ms ease-in-out;
}

#CameraMode .lower-third.hide {
  bottom: -50%;
  background-color: rgba(0, 0, 0, 0%);
}
</style>
