<script setup lang="ts">
import RootProvider from './examples/circular/root-provider.vue'
import Basic from './examples/linear/basic.vue'
import Indeterminate from './examples/linear/indeterminate.vue'
import InitialValue from './examples/linear/initial-value.vue'
import MinMax from './examples/linear/min-max.vue'
import ValueText from './examples/linear/value-text.vue'
</script>
<template>
  <Story title="Progress / Linear">
    <Variant title="Basic">
      <Basic />
    </Variant>
    <Variant title="Initial Value">
      <InitialValue />
    </Variant>
    <Variant title="Min Max">
      <MinMax />
    </Variant>
    <Variant title="Indeterminate">
      <Indeterminate />
    </Variant>
    <Variant title="Value Text">
      <ValueText />
    </Variant>
    <Variant title="RootProvider">
      <RootProvider />
    </Variant>
  </Story>
</template>
