<script setup lang="ts">
import Basic from './examples/basic.vue'
import WithFallback from './examples/with-fallback.vue'
</script>

<template>
  <Story title="ClientOnly">
    <Variant title="Basic">
      <Basic />
    </Variant>
    <Variant title="WithFallback">
      <WithFallback />
    </Variant>
  </Story>
</template>
