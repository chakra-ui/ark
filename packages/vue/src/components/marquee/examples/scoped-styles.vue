<script setup lang="ts">
import { Marquee } from '@ark-ui/vue/marquee'

const items = ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry', 'Fig', 'Grape']
</script>

<template>
  <Marquee.Root :auto-fill="true">
    <Marquee.Viewport>
      <Marquee.Content class="marquee-content">
        <Marquee.Item v-for="item in items" :key="item" style="padding: 0 2rem">
          {{ item }}
        </Marquee.Item>
      </Marquee.Content>
    </Marquee.Viewport>
  </Marquee.Root>
</template>

<style scoped>
/* This should work with scoped styles - the data-v-* attribute should be on each content element */
.marquee-content {
  background: blue;
  color: white;
  padding: 0.5rem;
}

.marquee-content:hover {
  background: darkblue;
}
</style>
