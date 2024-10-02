<script setup lang="ts">
// biome-ignore lint/style/useImportType: <explanation>
import { Frame } from '@ark-ui/vue/frame'
import { ref } from 'vue'

const frameRef = ref<InstanceType<typeof Frame> | null>(null)

const onMount = () => {
  const doc = frameRef.value?.frameRef?.contentDocument
  if (!doc) return
  const script = doc.createElement('script')
  script.innerHTML = 'console.log("Hello from inside the frame!")'
  doc.body.appendChild(script)
}
</script>

<template>
  <Frame
    ref="frameRef"
    title="Custom Frame"
    @mount="onMount"
    :style="{ border: '1px solid #ccc', width: '100%', height: 'var(--height)' }"
  >
    <div style="padding: 40px">
      <h1>Hello from inside the frame!</h1>
      <p>This content is rendered within our custom frame component using a Portal.</p>
    </div>
  </Frame>
</template>
