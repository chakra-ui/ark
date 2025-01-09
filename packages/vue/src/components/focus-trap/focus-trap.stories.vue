<script setup lang="ts">
import Basic from './examples/basic.vue'
import InitialFocus from './examples/initial-focus.vue'
import Autofocus from './examples/autofocus.vue'
</script>

<template>
  <Story title="Focus Trap">
    <Variant title="Basic">
      <Basic />
    </Variant>
    <Variant title="Initial Focus">
      <InitialFocus />
    </Variant>
    <Variant title="Autofocus">
      <Autofocus />
    </Variant>
  </Story>
</template>
