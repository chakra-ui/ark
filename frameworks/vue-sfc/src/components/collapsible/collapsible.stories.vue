<script setup>
import Basic from './examples/basic.vue'
import LazyMount from './examples/lazy-mount.vue'
import OnExitComplete from './examples/on-exit-complete.vue'
</script>

<template>
  <Story title="Collapsible">
    <Variant title="Basic">
      <Basic />
    </Variant>
    <Variant title="LazyMount">
      <LazyMount />
    </Variant>
    <Variant title="OnExitComplete">
      <OnExitComplete />
    </Variant>
  </Story>
</template>