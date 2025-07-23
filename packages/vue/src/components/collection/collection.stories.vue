<script setup>
import ListSelectionMultiple from './examples/list-selection-multiple.vue'
import ListSelectionRange from './examples/list-selection-range.vue'
import ListSelection from './examples/list-selection.vue'
</script>

<template>
  <Story title="Collection">
    <Variant title="ListSelection">
      <ListSelection />
    </Variant>
    <Variant title="ListSelectionMultiple">
      <ListSelectionMultiple />
    </Variant>
    <Variant title="ListSelectionRange">
      <ListSelectionRange />
    </Variant>
  </Story>
</template>
