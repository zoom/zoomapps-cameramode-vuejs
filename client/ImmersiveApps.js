/**
 * Copyright (c) 2022 Zoom Video Communications, Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
import zoomSdk from "@zoom/appssdk";
import { createApp, reactive } from "vue";
import ImmersiveApps from "./ImmersiveApps.vue";
import { deepAssignWithOptions } from "./deepAssign.js";
const deepAssign = deepAssignWithOptions({ proto: false });
let config = reactive({ media: {}, runningContext: "" });
let messageBus = reactive({ message: null });

const app = createApp(ImmersiveApps)
  .provide("zoomSdk", zoomSdk)
  .provide("config", config)
  .provide("messageBus", messageBus);
const immersiveApp = app.mount("#ImmersiveApps");

const capabilities = [
  "clearParticipant",
  "clearWebView",
  "closeRenderingContext",
  "drawParticipant",
  "drawWebView",
  "getRunningContext",
  "getSupportedJsApis",
  "getUserContext",
  "onMessage",
  "onMyMediaChange",
  "postMessage",
  "runRenderingContext",
];

window.addEventListener("load", () => {
  window._app = app;
  if (zoomSdk) {
    zoomSdk
      .config({ capabilities: capabilities })
      .then((c) => {
        deepAssign(config, c);
      })
      .catch(immersiveApp.onZoomSdkError);
    zoomSdk.onMyMediaChange((result) => {
      if (result?.media) {
        console.log("onMyMediaChange", result);
        deepAssign(config.media || {}, result.media);
      }
    });
    zoomSdk.onMessage((msg) => {
      console.log("onMessage", msg);
      messageBus.message = msg;
    });
  } else {
    console.error("This app only works in the Zoom Client");
  }
});
