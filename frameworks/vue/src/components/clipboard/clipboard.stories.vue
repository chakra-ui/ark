<script setup lang="ts">
import Basic from './examples/basic.vue'
import RenderFn from './examples/render-fn.vue'
</script>
<template>
  <Story title="Clipboard">
    <Variant title="Basic">
      <Basic />
    </Variant>
    <Variant title="RenderFn">
      <RenderFn />
    </Variant>
  </Story>
</template>
