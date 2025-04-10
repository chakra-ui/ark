<script setup lang="ts">
import Basic from './examples/basic.vue'
import Controlled from './examples/controlled.vue'
import LazyMount from './examples/lazy-mount.vue'
import RenderFn from './examples/render-fn.vue'
import RootProvider from './examples/root-provider.vue'
</script>
<template>
  <Story title="Dialog">
    <Variant title="Basic">
      <Basic />
    </Variant>
    <Variant title="Controlled">
      <Controlled />
    </Variant>
    <Variant title="LazyMount">
      <LazyMount />
    </Variant>
    <Variant title="RenderFn">
      <RenderFn />
    </Variant>
    <Variant title="RootProvider">
      <RootProvider />
    </Variant>
  </Story>
</template>
