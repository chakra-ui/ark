<script setup lang="ts">
import Basic from './examples/basic.vue'
import Controlled from './examples/controlled.vue'
import MultipleMonths from './examples/multiple-months.vue'
import Range from './examples/range.vue'
import RootProvider from './examples/root-provider.vue'
import Inline from './examples/inline.vue'
</script>
<template>
  <Story title="DatePicker">
    <Variant title="Basic">
      <Basic />
    </Variant>
    <Variant title="Controlled">
      <Controlled />
    </Variant>
    <Variant title="Inline">
      <Inline />
    </Variant>
    <Variant title="Range">
      <Range />
    </Variant>
    <Variant title="Multiple Months">
      <MultipleMonths />
    </Variant>
    <Variant title="RootProvider">
      <RootProvider />
    </Variant>
  </Story>
</template>
