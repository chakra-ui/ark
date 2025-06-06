<script setup lang="ts">
import { Splitter } from '@ark-ui/vue/splitter'
</script>

<template>
  <Splitter.Root :panels="[{ id: 'a' }, { id: 'b' }]">
    <Splitter.Context v-slot="splitter">
      <Splitter.Panel id="a">
        <button @click="splitter.resizePanel('a', 10)">Set A to 10%</button>
      </Splitter.Panel>
      <Splitter.ResizeTrigger id="a:b" aria-label="Resize" />
      <Splitter.Panel id="b">
        <button @click="splitter.resizePanel('b', 10)">Set B to 10%</button>
      </Splitter.Panel>
    </Splitter.Context>
  </Splitter.Root>
</template>
