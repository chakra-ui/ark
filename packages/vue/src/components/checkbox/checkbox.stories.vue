<script setup lang="ts">
import Basic from './examples/basic.vue'
import Controlled from './examples/controlled.vue'
import Indeterminate from './examples/indeterminate.vue'
import RenderProp from './examples/render-prop.vue'
import WithGroupVModel from './examples/with-group-vmodel.vue'
import WithGroup from './examples/with-group.vue'
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
    <Variant title="WithGroup">
      <WithGroup />
    </Variant>
    <Variant title="WithGroupVModel">
      <WithGroupVModel />
    </Variant>
  </Story>
</template>
