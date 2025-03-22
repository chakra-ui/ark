<script setup lang="ts">
import { Splitter } from '@ark-ui/vue/splitter'
import { ref } from 'vue'

const panels = ref([{ id: 'a' }, { id: 'b' }])
</script>

<template>
  <Splitter.Root orientation="vertical" :panels="panels">
    <Splitter.Panel id="a">A</Splitter.Panel>
    <Splitter.ResizeTrigger id="a:b" />
    <Splitter.Panel id="b">B</Splitter.Panel>
  </Splitter.Root>
</template>
