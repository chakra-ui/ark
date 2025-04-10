<script setup lang="ts">
import { ref } from 'vue'
import { Splitter } from '../'

const panels = ref([{ id: 'a' }, { id: 'b' }])
</script>

<template>
  <Splitter.Root :panels="panels">
    <Splitter.Panel id="a">A</Splitter.Panel>
    <Splitter.ResizeTrigger id="a:b" aria-label="Resize" />
    <Splitter.Panel id="b">B</Splitter.Panel>
  </Splitter.Root>
</template>
