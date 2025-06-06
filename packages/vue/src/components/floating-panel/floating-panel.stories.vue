<script setup lang="ts">
import AnchorPosition from './examples/anchor-position.vue'
import Basic from './examples/basic.vue'
import ControlledOpen from './examples/controlled-open.vue'
import ControlledPosition from './examples/controlled-position.vue'
import ControlledSize from './examples/controlled-size.vue'
import LazyMount from './examples/lazy-mount.vue'
import RenderFn from './examples/render-fn.vue'
</script>

<template>
  <Story title="Floating Panel">
    <Variant title="Basic">
      <Basic />
    </Variant>
    <Variant title="AnchorPosition">
      <AnchorPosition />
    </Variant>
    <Variant title="ControlledPosition">
      <ControlledPosition />
    </Variant>
    <Variant title="ControlledOpen">
      <ControlledOpen />
    </Variant>
    <Variant title="ControlledSize">
      <ControlledSize />
    </Variant>
    <Variant title="LazyMount">
      <LazyMount />
    </Variant>
    <Variant title="RenderFn">
      <RenderFn />
    </Variant>
  </Story>
</template>
