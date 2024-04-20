<script setup lang="ts">
import { ref } from 'vue'
import { Splitter } from '../..'

const size = ref([
  { id: 'a', size: 50 },
  { id: 'b', size: 50 },
])
</script>

<template>
  <Splitter.Root :size="size" v-slot="api">
    <Splitter.Panel id="a">
      <button @click="api.setSize('a', 10)">Set A to 10%</button>
    </Splitter.Panel>
    <Splitter.ResizeTrigger id="a:b" />
    <Splitter.Panel id="b">
      <button @click="api.setSize('b', 10)">Set B to 10%</button>
    </Splitter.Panel>
  </Splitter.Root>
</template>
