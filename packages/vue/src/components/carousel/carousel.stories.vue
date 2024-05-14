<script setup lang="ts">
import Basic from './examples/basic.vue'
import Controlled from './examples/controlled.vue'
import Customized from './examples/customized.vue'
</script>
<template>
  <Story title="Carousel">
    <Variant title="Basic">
      <Basic />
    </Variant>
    <Variant title="Controlled">
      <Controlled />
    </Variant>
    <Variant title="Customized">
      <Customized />
    </Variant>
  </Story>
</template>
