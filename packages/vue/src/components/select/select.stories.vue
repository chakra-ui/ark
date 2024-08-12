<script setup lang="ts">
import Advanced from './examples/advanced.vue'
import Basic from './examples/basic.vue'
import Controlled from './examples/controlled.vue'
import Multiple from './examples/multiple.vue'
import ReactiveCollection from './examples/reactive-collection.vue'
import WithField from './examples/with-field.vue'
</script>

<template>
  <Story title="Select">
    <Variant title="Basic">
      <Basic />
    </Variant>
    <Variant title="Advanced">
      <Advanced />
    </Variant>
    <Variant title="Multiple">
      <Multiple />
    </Variant>
    <Variant title="Controlled">
      <Controlled />
    </Variant>
    <Variant title="With Field">
      <WithField />
    </Variant>
    <Variant title="Reactive Collection">
      <ReactiveCollection />
    </Variant>
  </Story>
</template>
