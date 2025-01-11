<script setup lang="ts">
import { Frame } from '@ark-ui/vue/frame'
import DemoTour from './tour.vue'
</script>

<template>
  <main>
    <DemoTour />
    <div class="tour">
      <div class="steps__container">
        <h3 id="step-1">Step 1</h3>
        <div class="overflow__container">
          <div class="h-200px" />
          <h3 id="step-2">Step 2</h3>
          <div class="h-100px" />
        </div>
        <Frame>
          <h1 id="step-2a">Iframe Content</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua.
          </p>
        </Frame>
        <h3 id="step-3">Step 3</h3>
        <h3 id="step-4">Step 4</h3>
      </div>
    </div>
  </main>
</template>
