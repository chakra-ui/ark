<script setup lang="ts">
import Basic from './examples/basic.vue'
import Collapsible from './examples/collapsible.vue'
import Controlled from './examples/controlled.vue'
import Disabled from './examples/disabled.vue'
import Multiple from './examples/multiple.vue'
import RenderProp from './examples/render-prop.vue'
import Vertical from './examples/vertical.vue'
</script>
<template>
  <Story title="Accordion">
    <Variant title="Basic">
      <Basic />
    </Variant>
    <Variant title="RenderProp">
      <RenderProp />
    </Variant>
    <Variant title="Collapsible">
      <Collapsible />
    </Variant>
    <Variant title="Multiple">
      <Multiple />
    </Variant>
    <Variant title="Controlled">
      <Controlled />
    </Variant>
    <Variant title="Vertical">
      <Vertical />
    </Variant>
    <Variant title="Disabled">
      <Disabled />
    </Variant>
  </Story>
</template>
