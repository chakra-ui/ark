<script setup lang="ts">
import Basic from './examples/basic.vue'
import Events from './examples/events.vue'
import RenderProp from './examples/render-prop.vue'
import RootProvider from './examples/root-provider.vue'
import Vertical from './examples/vertical.vue'
</script>
<template>
  <Story title="Splitter">
    <Variant title="Basic">
      <Basic />
    </Variant>
    <Variant title="RenderProp">
      <RenderProp />
    </Variant>
    <Variant title="Events">
      <Events />
    </Variant>
    <Variant title="Vertical">
      <Vertical />
    </Variant>
    <Variant title="RootProvider">
      <RootProvider />
    </Variant>
  </Story>
</template>
