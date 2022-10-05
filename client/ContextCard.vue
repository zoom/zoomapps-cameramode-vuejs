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
  inject: ["zoomSdk"],
  props: {
    runningContext: {
      type: String,
      default: "",
    },
  },
  emits: ["set-running-context"],

  data() {
    return {
      error: null,
      runRenderingContextView: "camera",
      cutout: "",
    };
  },

  computed: {
    runRenderingContextOptions() {
      let options = {};
      if (this.runRenderingContextView) {
        options.view = this.runRenderingContextView;
      }
      if (this.runRenderingContextView == "immersive" && this.cutout != "") {
        options.defaultCutout = this.cutout;
      }
      return options;
    },
  },

  methods: {
    onZoomSdkError(err) {
      this.error = err;
    },
    getRunningContext() {
      this.zoomSdk
        .getRunningContext()
        .then((runningContext) => {
          this.$emit("set-running-context", runningContext);
        })
        .catch(this.onZoomSdkError);
    },
    runRenderingContext() {
      const options = this.runRenderingContextOptions;
      console.log("runRenderingContext", options);
      this.zoomSdk.runRenderingContext(options).catch(this.onZoomSdkError);
    },
    closeRenderingContext() {
      this.zoomSdk.closeRenderingContext().catch(this.onZoomSdkError);
    },
  },
};
</script>

<template>
  <div id="ContextCard">
    <div class="card-title">Context</div>
    <ErrorAlert :error="error" @close="error = null" />
    <div>
      <button class="btn btn-primary btn-sm" @click="getRunningContext">
        getRunningContext()
      </button>
    </div>
    <div>
      Running Context: <code>{{ runningContext }}</code>
    </div>
    <div class="btn-group btn-group-toggle" data-toggle="buttons">
      <label class="btn btn-secondary btn-sm">
        <input
          v-model="runRenderingContextView"
          type="radio"
          name="runRenderingContextView"
          value="immersive"
        />
        immersive
      </label>
      <label class="btn btn-secondary btn-sm">
        <input
          v-model="runRenderingContextView"
          type="radio"
          name="runRenderingContextView"
          value="camera"
        />
        camera
      </label>
    </div>
    <div v-if="runRenderingContextView != 'camera'" class="row">
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
    <div>
      <button class="btn btn-primary btn-sm" @click="runRenderingContext">
        runRenderingContext({{ runRenderingContextOptions }})
      </button>
    </div>
    <div>
      <button class="btn btn-warning btn-sm" @click="closeRenderingContext">
        closeRenderingContext()
      </button>
    </div>
  </div>
</template>
