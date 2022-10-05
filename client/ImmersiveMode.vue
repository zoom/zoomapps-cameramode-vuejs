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
import ConfigCard from "./ConfigCard.vue";
import ErrorAlert from "./ErrorAlert.vue";

export default {
  components: { ConfigCard, ErrorAlert },
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
      cutout: "",
      drawParticipantX: 0,
      drawParticipantY: 0,
      drawParticipantWidthHeight: "533,300",
      drawParticipantZIndex: 1,
      controllerModeMessage: "",
    };
  },

  computed: {
    drawParticipantOptions() {
      const [width, height] = this.drawParticipantWidthHeight.split(",");

      const options = {
        participantUUID: this.me?.participantUUID,
        x: parseInt(this.drawParticipantX),
        y: parseInt(this.drawParticipantY),
        width: parseInt(width),
        height: parseInt(height),
        zIndex: parseInt(this.drawParticipantZIndex),
      };
      if (this.cutout != "") {
        options.cutout = this.cutout;
      }
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
      console.log("drawParticipant", options);
      this.zoomSdk.drawParticipant(options).catch((e) => (this.error = e));
    },
    clearParticipant() {
      this.zoomSdk
        .clearParticipant({
          participantUUID: this.me?.participantUUID,
        })
        .catch((e) => (this.error = e));
    },
  },
};
</script>

<template>
  <div id="ImmersiveMode" class="container">
    <h1>Immersive Mode</h1>
    <ErrorAlert :error="error" @close="error = null" />
    <div class="row">
      <div class="col-md">
        <ConfigCard class="card card-body shadow" />
      </div>
      <div class="col-md">
        <pre>options: {{ drawParticipantOptions }}</pre>
        <label class="row">
          <div class="col-3">x:</div>
          <div class="col-5">
            <input
              v-model="drawParticipantX"
              type="range"
              min="0"
              max="2000"
              step="40"
            />
          </div>
          <div class="col-4">
            <input
              v-model="drawParticipantX"
              type="text"
              class="form-control"
            />
          </div>
        </label>
        <label class="row">
          <div class="col-3">y:</div>
          <div class="col-5">
            <input
              v-model="drawParticipantY"
              type="range"
              min="0"
              max="2000"
              step="40"
            />
          </div>
          <div class="col-4">
            <input
              v-model="drawParticipantY"
              type="text"
              class="form-control"
            />
          </div>
        </label>
        <div class="row">
          <div class="col-sm">width,height:</div>
          <div class="col-md">
            <select v-model="drawParticipantWidthHeight" class="form-select">
              <option value="533,300">533 x 300</option>
              <option value="1280,720">1280 x 720</option>
              <option value="1920,1080">1920 x 1080</option>
            </select>
          </div>
        </div>
        <label class="row">
          <div class="col-3">zIndex:</div>
          <div class="col-5">
            <input
              v-model="drawParticipantZIndex"
              type="range"
              min="-2"
              max="5"
            />
          </div>
          <div class="col-4">
            <input
              v-model="drawParticipantZIndex"
              type="text"
              class="form-control"
            />
          </div>
        </label>
        <div class="row">
          <div class="col-sm">cutout:</div>
          <div class="col-md">
            <select v-model="cutout" class="form-select">
              <option value="">(default)</option>
              <option value="person">person</option>
              <option value="rectangle">rectangle</option>
              <option value="standard">standard</option>
              <option value="circle">circle</option>
              <option value="square">square</option>
              <option value="rectangle">rectangle</option>
              <option value="verticalRectangle">verticalRectangle</option>
            </select>
          </div>
        </div>

        <button class="btn btn-primary btn-sm" @click="drawParticipant">
          drawParticipant(options)
        </button>
        <button class="btn btn-warning btn-sm" @click="clearParticipant">
          clearParticipant({participantUUID: "{{ me?.participantUUID }}"})
        </button>
      </div>
    </div>
  </div>
</template>
