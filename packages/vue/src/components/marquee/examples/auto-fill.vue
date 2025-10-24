<script setup lang="ts">
import { Marquee } from '@ark-ui/vue/marquee'

const items = ['Apple', 'Banana', 'Cherry']
</script>

<template>
  <Marquee.Root auto-fill spacing="2rem">
    <Marquee.Viewport>
      <Marquee.Content>
        <div v-for="item in items" :key="item" style="padding: 0 2rem">{{ item }}</div>
      </Marquee.Content>
    </Marquee.Viewport>
  </Marquee.Root>
</template>
