<script setup lang="ts">
import { Marquee } from '@ark-ui/vue/marquee'

const items = ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry', 'Fig', 'Grape']
</script>

<template>
  <Marquee.Root side="bottom" style="height: 300px">
    <Marquee.Viewport>
      <Marquee.Content>
        <Marquee.Item v-for="item in items" :key="item" style="padding: 1rem 0">{{ item }}</Marquee.Item>
      </Marquee.Content>
    </Marquee.Viewport>
  </Marquee.Root>
</template>
