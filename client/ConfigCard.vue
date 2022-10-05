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
  <div class="">
    <a @click="collapseConfig = !collapseConfig">
      Config:
      <span v-if="collapseConfig">▶︎</span>
      <span v-if="!collapseConfig">▼</span>
    </a>
    <pre
      :class="{ collapse: collapseConfig }"
    ><code class="language-json">{{ config }}</code></pre>
    <a @click="collapseMedia = !collapseMedia">
      Media:
      <span v-if="collapseMedia">▶︎</span>
      <span v-if="!collapseMedia">▼</span>
    </a>
    <pre
      :class="{ collapse: collapseMedia }"
    ><code class="language-json">{{ config.media }}</code></pre>
    <div
      v-if="config.unsupportedApis && config.unsupportedApis.length > 0"
      class="alert alert-danger"
    >
      unsupported APIs in zoomSdk config capabilities
      <div v-for="api in config.unsupportedApis" :key="api">
        <li>{{ api }}</li>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  inject: ["config"],

  data() {
    return {
      collapseConfig: true,
      collapseMedia: true,
    };
  },
};
</script>
