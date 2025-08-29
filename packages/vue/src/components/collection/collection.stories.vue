<script setup>
import BasicExample from './examples/list-selection/basic.vue'
import MultipleExample from './examples/list-selection/multiple.vue'
import RangeExample from './examples/list-selection/range.vue'
</script>

<template>
  <Story title="Collection">
    <Variant title="Basic">
      <BasicExample />
    </Variant>
    <Variant title="Multiple">
      <MultipleExample />
    </Variant>
    <Variant title="Range">
      <RangeExample />
    </Variant>
  </Story>
</template>
