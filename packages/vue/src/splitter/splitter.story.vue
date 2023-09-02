<script setup lang="ts">
import { ref } from 'vue'
import { Splitter, SplitterPanel, SplitterResizeTrigger } from './'
import './splitter.css'

const size = ref([
  { id: 'a', size: 50 },
  { id: 'b', size: 50 },
])
</script>
<template>
  <Story title="Splitter">
    <Variant title="Basic">
      <Splitter :size="size">
        <SplitterPanel id="a">A</SplitterPanel>
        <SplitterResizeTrigger id="a:b" />
        <SplitterPanel id="b">B</SplitterPanel>
      </Splitter>
    </Variant>
    <Variant title="Events">
      <Splitter
        :size="size"
        on-resize-start="() => console.log('onResizeStart')"
        on-resize-end="() => console.log('onResizeEnd')"
      >
        <SplitterPanel id="a">A</SplitterPanel>
        <SplitterResizeTrigger id="a:b" />
        <SplitterPanel id="b">B</SplitterPanel>
      </Splitter>
    </Variant>
    <Variant title="Vertical">
      <Splitter :size="size" orientation="vertical">
        <SplitterPanel id="a">A</SplitterPanel>
        <SplitterResizeTrigger id="a:b" />
        <SplitterPanel id="b">B</SplitterPanel>
      </Splitter>
    </Variant>
  </Story>
</template>
