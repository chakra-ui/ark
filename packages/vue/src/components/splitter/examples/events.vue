<script setup lang="ts">
import { Splitter } from '@ark-ui/vue/splitter'
import { ref } from 'vue'

const panels = ref([{ id: 'a' }, { id: 'b' }])
</script>

<template>
  <Splitter.Root
    :panels="panels"
    @resize="(details) => console.log('onResize', details)"
    @resize-start="() => console.log('onResizeStart')"
    @resize-end="(details) => console.log('onResizeEnd', details)"
    @expand="(details) => console.log('onExpand', details)"
    @collapse="(details) => console.log('onCollapse', details)"
  >
    <Splitter.Panel id="a">A</Splitter.Panel>
    <Splitter.ResizeTrigger id="a:b" aria-label="Resize" />
    <Splitter.Panel id="b">B</Splitter.Panel>
  </Splitter.Root>
</template>
