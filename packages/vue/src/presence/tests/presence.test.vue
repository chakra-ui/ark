<script setup lang="ts">
import { ref } from 'vue'
import { Presence } from '../'

const props = defineProps({
  lazyMount: Boolean,
  unmountOnExit: Boolean,
})

const isPresent = ref(false)
</script>

<template>
  <div>
    <button @click="isPresent = !isPresent">Toggle</button>
    <Presence
      :present="isPresent"
      :lazy-mount="props.lazyMount"
      :unmount-on-exit="props.unmountOnExit"
    >
      <div data-testid="box">Content!</div>
    </Presence>
  </div>
</template>
