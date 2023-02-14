<script setup lang="ts">
import Basic from './basic.stories.vue'
</script>
<template>
  <div :style="{ height: '100vh' }">
    <Basic orientation="vertical">
      <Basic>
        <Basic orientation="vertical" />
      </Basic>
    </Basic>
  </div>
</template>
