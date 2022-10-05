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
import CameraCard from "./CameraCard.vue";
import CameraMode from "./CameraMode.vue";
import ConfigCard from "./ConfigCard.vue";
import ContextCard from "./ContextCard.vue";
import ErrorAlert from "./ErrorAlert.vue";
import ImmersiveMode from "./ImmersiveMode.vue";

export default {
  components: {
    CameraCard,
    CameraMode,
    ConfigCard,
    ContextCard,
    ErrorAlert,
    ImmersiveMode,
  },
  inject: ["zoomSdk", "config"],

  data() {
    return {
      error: null,
      participants: [],
    };
  },

  computed: {
    showMainCards() {
      return (
        this.config.runningContext &&
        this.config.runningContext !== "inCamera" &&
        this.config.runningContext !== "inImmersive"
      );
    },
  },

  methods: {
    onZoomSdkError(err) {
      // called by zoomSdk.config(...).catch after window load event
      console.error("zoomSdk.config error", err);
      this.error = err;
    },
    onSetRunningContext(runningContext) {
      this.config.runningContext = runningContext;
    },
  },
};
</script>

<template>
  <div v-if="!config.runningContext">loading Zoom Apps...</div>
  <CameraMode v-if="config.runningContext === 'inCamera'" />
  <ImmersiveMode v-if="config.runningContext === 'inImmersive'" />
  <div v-if="showMainCards" id="ImmersiveApps">
    <div class="row">
      <ErrorAlert :error="error" @close="error = null" />
      <div class="col-md">
        <ConfigCard class="card card-body shadow" />
      </div>
      <div class="col-md">
        <ContextCard
          :running-context="config.runningContext"
          :set-running-context="onSetRunningContext"
          class="card card-body shadow"
        />
      </div>
    </div>
    <div class="row">
      <div class="col-md">
        <CameraCard :media="config.media" class="card card-body shadow" />
      </div>
    </div>
  </div>
</template>

<style>
#ImmersiveApps button {
  margin-bottom: 4px;
}
</style>
