<script setup lang="ts">
import { Marquee } from '@ark-ui/vue/marquee'

const items = ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry', 'Fig', 'Grape']
</script>

<template>
  <Marquee.Root>
    <Marquee.Edge side="start" />
    <Marquee.Viewport>
      <Marquee.Content>
        <div v-for="item in items" :key="item" style="padding: 0 2rem">{{ item }}</div>
      </Marquee.Content>
    </Marquee.Viewport>
    <Marquee.Edge side="end" />
  </Marquee.Root>
</template>
