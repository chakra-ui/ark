<script setup lang="ts">
import Accordion from './examples/accordion.vue'
import Basic from './examples/basic.vue'
import Collapsible from './examples/collapsible.vue'
import ContextFocusedValue from './examples/context/focusedValue.vue'
import ContextGetItemState from './examples/context/getItemState.vue'
import ContextSetValue from './examples/context/setValue.vue'
import ContextValue from './examples/context/value.vue'
import Controlled from './examples/controlled.vue'
import Disabled from './examples/disabled.vue'
import Horizontal from './examples/horizontal.vue'
import Multiple from './examples/multiple.vue'
import RenderProp from './examples/render-prop.vue'
import RootProvider from './examples/root-provider.vue'
import Vertical from './examples/vertical.vue'
</script>
<template>
  <Story id="accordion" title="Accordion">
    <Variant id="basic" title="Basic">
      <Basic />
    </Variant>
    <Variant id="render-prop" title="RenderProp">
      <RenderProp />
    </Variant>
    <Variant id="collapsible" title="Collapsible">
      <Collapsible />
    </Variant>
    <Variant id="multiple" title="Multiple">
      <Multiple />
    </Variant>
    <Variant id="controlled" title="Controlled">
      <Controlled />
    </Variant>
    <Variant id="vertical" title="Vertical">
      <Vertical />
    </Variant>
    <Variant id="horizontal" title="Horizontal">
      <Horizontal />
    </Variant>
    <Variant id="disabled" title="Disabled">
      <Disabled />
    </Variant>
    <Variant id="closed" title="Closed">
      <Accordion multiple :items="['React', 'Solid', 'Vue']" />
    </Variant>
    <Variant id="root-provider" title="RootProvider">
      <RootProvider />
    </Variant>
    <Variant id="context-focusedValue" title="ContextFocusedValue">
      <ContextFocusedValue />
    </Variant>
    <Variant id="context-value" title="ContextValue">
      <ContextValue />
    </Variant>
    <Variant id="context-set-value" title="ContextSetValue">
      <ContextSetValue />
    </Variant>
    <Variant id="context-get-item-state" title="ContextGetItemState">
      <ContextGetItemState />
    </Variant>
  </Story>
</template>
