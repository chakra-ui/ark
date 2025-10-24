<script setup lang="ts">
import { Marquee, useMarquee } from '@ark-ui/vue/marquee'

const items = ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry', 'Fig', 'Grape']

const marquee = useMarquee({})
</script>

<template>
  <Marquee.RootProvider :value="marquee">
    <Marquee.Viewport>
      <Marquee.Content>
        <div v-for="item in items" :key="item" style="padding: 0 2rem">{{ item }}</div>
      </Marquee.Content>
    </Marquee.Viewport>
  </Marquee.RootProvider>

  <div style="margin-top: 1rem; display: flex; gap: 0.5rem">
    <button @click="marquee.pause()">Pause</button>
    <button @click="marquee.resume()">Resume</button>
  </div>
</template>
