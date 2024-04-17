<script setup>
import Basic from './examples/basic.vue'
import Closed from './examples/closed.vue'
import Context from './examples/context.vue'
</script>

<template>
  <Story title="Avatar">
    <Variant title="Basic">
      <Basic />
    </Variant>
    <Variant title="Context">
      <Context />
    </Variant>
    <Variant title="Closed">
      <Closed name="Christian Schröter" />
    </Variant>
  </Story>
</template>