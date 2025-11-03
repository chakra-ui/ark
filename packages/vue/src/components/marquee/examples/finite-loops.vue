<script setup lang="ts">
import { ref } from 'vue'
import { Marquee } from '@ark-ui/vue/marquee'

const items = ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry', 'Fig', 'Grape']

const loopCount = ref(0)
const completedCount = ref(0)
</script>

<template>
  <Marquee.Root :loop-count="3" @loop-complete="loopCount++" @complete="completedCount++">
    <Marquee.Viewport>
      <Marquee.Content>
        <Marquee.Item v-for="item in items" :key="item" style="padding: 0 2rem">{{ item }}</Marquee.Item>
      </Marquee.Content>
    </Marquee.Viewport>
  </Marquee.Root>

  <div style="margin-top: 1rem">
    <p>Loop completed: {{ loopCount }} times</p>
    <p>Animation completed: {{ completedCount }} times</p>
  </div>
</template>
