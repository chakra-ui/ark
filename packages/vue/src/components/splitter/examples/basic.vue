<script setup lang="ts">
import { Splitter } from '@ark-ui/vue/splitter'
import { ref } from 'vue'

const panels = ref([{ id: 'a' }, { id: 'b' }])
const defaultSizes = ref([50, 50])
</script>

<template>
  <Splitter.Root :panels="panels" :defaultSizes="defaultSizes">
    <Splitter.Panel id="a">A</Splitter.Panel>
    <Splitter.ResizeTrigger id="a:b" />
    <Splitter.Panel id="b">B</Splitter.Panel>
  </Splitter.Root>
</template>
