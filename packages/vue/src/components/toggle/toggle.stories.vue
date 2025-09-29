<script setup lang="ts">
import Basic from './examples/basic.vue'
import Controlled from './examples/controlled.vue'
import Disabled from './examples/disabled.vue'
import Indicator from './examples/indicator.vue'
import RenderFn from './examples/render-fn.vue'
</script>

<template>
  <Story title="Toggle">
    <Variant title="Basic">
      <Basic />
    </Variant>
    <Variant title="Controlled">
      <Controlled />
    </Variant>
    <Variant title="Disabled">
      <Disabled />
    </Variant>
    <Variant title="Indicator">
      <Indicator />
    </Variant>
    <Variant title="Render Function">
      <RenderFn />
    </Variant>
  </Story>
</template>
