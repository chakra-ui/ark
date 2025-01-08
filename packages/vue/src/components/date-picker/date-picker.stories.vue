<script setup lang="ts">
import Basic from './examples/basic.vue'
import Controlled from './examples/controlled.vue'
import Range from './examples/range.vue'
import RootProvider from './examples/root-provider.vue'
import Standalone from './examples/standalone.vue'
</script>
<template>
  <Story title="DatePicker">
    <Variant title="Basic">
      <Basic />
    </Variant>
    <Variant title="Controlled">
      <Controlled />
    </Variant>
    <Variant title="Standalone">
      <Standalone />
    </Variant>
    <Variant title="Range">
      <Range />
    </Variant>
    <Variant title="RootProvider">
      <RootProvider />
    </Variant>
  </Story>
</template>
