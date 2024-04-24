<script setup lang="ts">
import Advanced from './examples/advanced.vue'
import Basic from './examples/basic.vue'
import Controlled from './examples/controlled.vue'
import Multiple from './examples/multiple.vue'
</script>
<template>
  <Story title="Select">
    <Variant title="Basic">
      <Basic />
    </Variant>
    <Variant title="Advanced">
      <Advanced />
    </Variant>
    <Variant title="Multiple">
      <Multiple />
    </Variant>
    <Variant title="Controlled">
      <Controlled />
    </Variant>
  </Story>
</template>
