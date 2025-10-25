<script setup lang="ts">
import { Marquee } from '@ark-ui/vue/marquee'

const items = ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry', 'Fig', 'Grape']
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 2rem">
    <div>
      <h3>Slow (25px/s)</h3>
      <Marquee.Root :speed="25">
        <Marquee.Viewport>
          <Marquee.Content>
            <div v-for="item in items" :key="item" style="padding: 0 2rem">{{ item }}</div>
          </Marquee.Content>
        </Marquee.Viewport>
      </Marquee.Root>
    </div>

    <div>
      <h3>Normal (50px/s)</h3>
      <Marquee.Root :speed="50">
        <Marquee.Viewport>
          <Marquee.Content>
            <div v-for="item in items" :key="item" style="padding: 0 2rem">{{ item }}</div>
          </Marquee.Content>
        </Marquee.Viewport>
      </Marquee.Root>
    </div>

    <div>
      <h3>Fast (100px/s)</h3>
      <Marquee.Root :speed="100">
        <Marquee.Viewport>
          <Marquee.Content>
            <div v-for="item in items" :key="item" style="padding: 0 2rem">{{ item }}</div>
          </Marquee.Content>
        </Marquee.Viewport>
      </Marquee.Root>
    </div>
  </div>
</template>
