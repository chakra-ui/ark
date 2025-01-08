<script setup lang="ts">
import Autoplay from './examples/autoplay.vue'
import Basic from './examples/basic.vue'
import Controlled from './examples/controlled.vue'
import RootProvider from './examples/root-provider.vue'
</script>
<template>
  <Story title="Carousel">
    <Variant title="Basic">
      <Basic />
    </Variant>
    <Variant title="Controlled">
      <Controlled />
    </Variant>
    <Variant title="Autoplay">
      <Autoplay />
    </Variant>
    <Variant title="RootProvider">
      <RootProvider />
    </Variant>
  </Story>
</template>
