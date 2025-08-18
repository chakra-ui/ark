<script setup lang="ts">
import Basic from './examples/basic.vue'
import BothDirections from './examples/both-directions.vue'
import Context from './examples/context.vue'
import Horizontal from './examples/horizontal.vue'
import Nested from './examples/nested.vue'
import RootProvider from './examples/root-provider.vue'
</script>

<template>
  <Story title="Scroll Area">
    <Variant title="Basic">
      <Basic />
    </Variant>
    <Variant title="Both Directions">
      <BothDirections />
    </Variant>
    <Variant title="Context">
      <Context />
    </Variant>
    <Variant title="Horizontal">
      <Horizontal />
    </Variant>
    <Variant title="Nested">
      <Nested />
    </Variant>
    <Variant title="Root Provider">
      <RootProvider />
    </Variant>
  </Story>
</template>
