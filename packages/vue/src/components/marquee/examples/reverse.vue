<script setup lang="ts">
import { Marquee } from '@ark-ui/vue/marquee'

const items = ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry', 'Fig', 'Grape']
</script>

<template>
  <Marquee.Root reverse>
    <Marquee.Viewport>
      <Marquee.Content>
        <Marquee.Item v-for="item in items" :key="item" style="padding: 0 2rem">{{ item }}</Marquee.Item>
      </Marquee.Content>
    </Marquee.Viewport>
  </Marquee.Root>
</template>
