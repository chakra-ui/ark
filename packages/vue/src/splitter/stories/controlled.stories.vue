<script setup lang="ts">
import { ref } from 'vue'
import { Splitter, SplitterPanel, type SplitterProps, SplitterResizeTrigger } from '../'
import '../splitter.css'

const size = ref([
  { id: 'first', size: 50 },
  { id: 'second', size: 50 },
])

const handleResizeEnd: SplitterProps['onResizeEnd'] = (details) => {
  size.value = details.size.map((s) => ({
    id: `${s.id}`,
    size: s.size!,
  }))
}
</script>
<template>
  <div :style="{ height: '100vh' }">
    <Splitter :size="size" @resizeEnd="handleResizeEnd">
      <SplitterPanel id="first">
        <p>first</p>
      </SplitterPanel>
      <SplitterResizeTrigger id="first:second">
        <div className="bar" />
      </SplitterResizeTrigger>
      <SplitterPanel id="second">
        <p>second</p>
      </SplitterPanel>
    </Splitter>
  </div>
</template>
