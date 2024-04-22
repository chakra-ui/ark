<script setup lang="ts">
import Basic from './examples/basic.vue'
import Controlled from './examples/controlled.vue'
import Disabled from './examples/disabled.vue'
import InitialValue from './examples/initial-value.vue'
import RenderProp from './examples/render-prop.vue'
</script>
<template>
  <Story title="Switch">
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
    <Variant title="RenderProp">
      <RenderProp />
    </Variant>
  </Story>
</template>
