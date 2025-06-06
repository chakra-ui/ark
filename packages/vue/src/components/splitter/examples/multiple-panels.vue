<script setup lang="ts">
import { Splitter } from '@ark-ui/vue/splitter'
</script>

<template>
  <Splitter.Root
    :panels="[
      { id: 'a', minSize: 20 },
      { id: 'b', minSize: 40 },
      { id: 'c', minSize: 20 },
    ]"
    :default-size="[20, 60, 20]"
  >
    <Splitter.Panel id="a">A</Splitter.Panel>
    <Splitter.ResizeTrigger id="a:b" aria-label="Resize" />
    <Splitter.Panel id="b">B</Splitter.Panel>
    <Splitter.ResizeTrigger id="b:c" aria-label="Resize" />
    <Splitter.Panel id="c">C</Splitter.Panel>
  </Splitter.Root>
</template>
