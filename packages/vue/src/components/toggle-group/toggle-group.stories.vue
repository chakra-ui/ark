<script setup lang="ts">
import Basic from './examples/basic.vue'
import InitialValue from './examples/initial-value.vue'
import Multiple from './examples/multiple.vue'
import RootProvider from './examples/root-provider.vue'
</script>
<template>
  <Story title="ToggleGroup">
    <Variant title="Basic">
      <Basic />
    </Variant>
    <Variant title="InitialValue">
      <InitialValue />
    </Variant>
    <Variant title="Multiple">
      <Multiple />
    </Variant>
    <Variant title="RootProvider">
      <RootProvider />
    </Variant>
  </Story>
</template>
