<script setup lang="ts">
import { Splitter } from '@ark-ui/vue/splitter'
</script>

<template>
  <Splitter.Root
    :default-size="[15, 20]"
    :panels="[
      { id: 'a', collapsible: true, collapsedSize: 5, minSize: 10, maxSize: 20 },
      { id: 'b', minSize: 50 },
    ]"
  >
    <Splitter.Panel id="a">A</Splitter.Panel>
    <Splitter.ResizeTrigger id="a:b" aria-label="Resize" />
    <Splitter.Panel id="b">B</Splitter.Panel>
  </Splitter.Root>
</template>
