<script lang="ts" setup>
import Frame from '../frame.vue'
</script>

<template>
  <Frame
    title="Custom Frame"
    :style="{ border: '1px solid #ccc', width: '100%', height: 'var(--height)' }"
  >
    <div style="padding: 40px">
      <h1>Hello from inside the frame!</h1>
      <p>This content is rendered within our custom frame component using a Portal.</p>
    </div>
    <template #head>
      <component is="style">body { background-color: #f0f0f0; }</component>
    </template>
  </Frame>
</template>
