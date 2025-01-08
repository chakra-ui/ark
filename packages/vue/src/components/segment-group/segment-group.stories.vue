<script setup lang="ts">
import Basic from './examples/basic.vue'
import Controlled from './examples/controlled.vue'
import Disabled from './examples/disabled.vue'
import InitialValue from './examples/initial-value.vue'
import RootProvider from './examples/root-provider.vue' /* PartiallyEnd: #3632/scriptSetup.vue */
import RootProvider from './examples/root-provider.vue'
</script>
<template>
  <Story title="SegmentGroup">
    <Variant title="Basic">
      <Basic />
    </Variant>
    <Variant title="InitialValue">
      <InitialValue />
    </Variant>
    <Variant title="Controlled">
      <Controlled />
    </Variant>
    <Variant title="Disabled">
      <Disabled />
    </Variant>
    <Variant title="RootProvider">
      <RootProvider />
    </Variant>
  </Story>
</template>
