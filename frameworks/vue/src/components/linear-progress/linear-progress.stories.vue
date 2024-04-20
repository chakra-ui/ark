<script setup lang="ts">
import Basic from './examples/basic.vue'
import Indeterminate from './examples/indeterminate.vue'
import InitialValue from './examples/initial-value.vue'
import MinMax from './examples/min-max.vue'
import ValueText from './examples/value-text.vue'
import Vertical from './examples/vertical.vue'
</script>
<template>
<Story title="LinearProgress">
    <Variant title="Basic">
      <Basic />
    </Variant>
    <Variant title="InitialValue">
      <InitialValue />
    </Variant>
    <Variant title="MinMax">
      <MinMax />
    </Variant>
    <Variant title="Indeterminate">
      <Indeterminate />
    </Variant>
    <Variant title="ValueText">
      <ValueText />
    </Variant>
    <Variant title="Vertical">
      <Vertical />
    </Variant>
</Story>
</template>
