<script setup lang="ts">
import Arrow from './examples/arrow.vue'
import Basic from './examples/basic.vue'
import Controlled from './examples/controlled.vue'
import Positioning from './examples/positioning.vue'
import RenderFn from './examples/render-fn.vue'
import RootProvider from './examples/root-provider.vue'
import Timings from './examples/timings.vue'
</script>
<template>
  <Story title="Tooltip">
    <Variant title="Basic">
      <Basic />
    </Variant>
    <Variant title="Controlled">
      <Controlled />
    </Variant>
    <Variant title="RenderFn">
      <RenderFn />
    </Variant>
    <Variant title="Arrow">
      <Arrow />
    </Variant>
    <Variant title="Timings">
      <Timings />
    </Variant>
    <Variant title="Positioning">
      <Positioning />
    </Variant>
    <Variant title="RootProvider">
      <RootProvider />
    </Variant>
  </Story>
</template>
