<script setup lang="ts">
import Basic from './examples/basic.vue'
import RenderFn from './examples/render-fn.vue'
import RootProvider from './examples/root-provider.vue' /* PartiallyEnd: #3632/scriptSetup.vue */
import RootProvider from './examples/root-provider.vue'
</script>
<template>
  <Story title="Clipboard">
    <Variant title="Basic">
      <Basic />
    </Variant>
    <Variant title="RenderFn">
      <RenderFn />
    </Variant>
    <Variant title="RootProvider">
      <RootProvider />
    </Variant>
  </Story>
</template>
