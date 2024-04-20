<script setup lang="ts">
import { ref } from 'vue'
import { Splitter } from '../..'

const size = ref([
  { id: 'a', size: 50 },
  { id: 'b', size: 50 },
])
</script>

<template>
  <Splitter.Root
    :size="size"
    @size-change-start="(details) => console.log('onSizeChangeStart', details)"
    @size-change-end="(details) => console.log('onSizeChangeEnd', details)"
  >
    <Splitter.Panel id="a">A</Splitter.Panel>
    <Splitter.ResizeTrigger id="a:b" />
    <Splitter.Panel id="b">B</Splitter.Panel>
  </Splitter.Root>
</template>
