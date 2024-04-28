<script setup lang="ts">
import Basic from './examples/basic.vue'
import Controlled from './examples/controlled.vue'
import Indeterminate from './examples/indeterminate.vue'
import InitialValue from './examples/initial-value.vue'
import RenderProp from './examples/render-prop.vue'
</script>
<template>
  <Story title="Checkbox">
    <Variant title="Basic">
      <Basic />
    </Variant>
    <Variant title="Controlled">
      <Controlled />
    </Variant>
    <Variant title="Indeterminate">
      <Indeterminate />
    </Variant>
    <Variant title="RenderProp">
      <RenderProp />
    </Variant>
    <Variant title="Initial Value">
      <InitialValue />
    </Variant>
  </Story>
</template>
