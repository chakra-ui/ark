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
import Vertical from './examples/vertical.vue' /* PartiallyEnd: #3632/scriptSetup.vue */
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
    <Variant title="Horizontal">
      <Horizontal />
    </Variant>
    <Variant title="Disabled">
      <Disabled />
    </Variant>
    <Variant title="Closed">
      <Accordion multiple :items="['React', 'Solid', 'Vue']" />
    </Variant>
    <Variant title="RootProvider">
      <RootProvider />
    </Variant>
    <Variant title="ContextFocusedValue">
      <ContextFocusedValue />
    </Variant>
    <Variant title="ContextValue">
      <ContextValue />
    </Variant>
    <Variant title="ContextSetValue">
      <ContextSetValue />
    </Variant>
    <Variant title="ContextGetItemState">
      <ContextGetItemState />
    </Variant>
  </Story>
</template>
