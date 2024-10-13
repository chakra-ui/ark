<script setup lang="ts">
import { Splitter, useSplitter } from '@ark-ui/vue/splitter'
import { ref } from 'vue'

const size = ref([
  { id: 'a', size: 50 },
  { id: 'b', size: 50 },
])

const splitter = useSplitter({ size: size.value })
</script>

<template>
  <button @click="splitter.setToMaxSize('a')">Maximize a</button>

  <Splitter.RootProvider :value="splitter">
    <Splitter.Panel id="a">A</Splitter.Panel>
    <Splitter.ResizeTrigger id="a:b" />
    <Splitter.Panel id="b">B</Splitter.Panel>
  </Splitter.RootProvider>
</template>
