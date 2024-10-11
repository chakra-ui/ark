<script lang="ts" setup>
import { onBeforeUnmount, onMounted } from 'vue'

interface FrameContentEmits {
  (event: 'mount'): void
  (event: 'unmount'): void
}

const emit = defineEmits<FrameContentEmits>()

onMounted(() => {
  emit('mount')
})

onBeforeUnmount(() => {
  emit('unmount')
})
</script>

<template>
  <slot></slot>
</template>
