<script setup lang="ts">
import Basic from './examples/basic.vue'
import Range from './examples/range.vue'
import Standalone from './examples/standalone.vue'
</script>
<template>
  <Story title="DatePicker">
    <Variant title="Basic">
      <Basic />
    </Variant>
    <Variant title="Standalone">
      <Standalone />
    </Variant>
    <Variant title="Range">
      <Range />
    </Variant>
  </Story>
</template>
