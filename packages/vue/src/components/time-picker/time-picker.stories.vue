<script setup lang="ts">
import Advanced from './examples/advanced.vue'
import Basic from './examples/basic.vue'
import RootProvider from './examples/root-provider.vue'
</script>

<template>
  <Story title="TimePicker">
    <Variant title="Basic">
      <Basic />
    </Variant>
    <Variant title="Advanced">
      <Advanced />
    </Variant>
    <Variant title="RootProvider">
      <RootProvider />
    </Variant>
  </Story>
</template>
