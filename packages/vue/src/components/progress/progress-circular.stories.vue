<script setup lang="ts">
import Basic from './examples/circular/basic.vue'
import Controlled from './examples/circular/controlled.vue'
import Indeterminate from './examples/circular/indeterminate.vue'
import InitialValue from './examples/circular/initial-value.vue'
import MinMax from './examples/circular/min-max.vue'
import RootProvider from './examples/circular/root-provider.vue'
import ValueText from './examples/circular/value-text.vue'
</script>
<template>
  <Story title="Progress - Circular">
    <Variant title="Basic">
      <Basic />
    </Variant>
    <Variant title="Controlled">
      <Controlled />
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
