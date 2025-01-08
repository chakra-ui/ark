<script setup lang="ts">
import Basic from './examples/basic.vue'
import Script from './examples/script.vue'
import SrcDoc from './examples/src-doc.vue' /* PartiallyEnd: #3632/scriptSetup.vue */
import SrcDoc from './examples/src-doc.vue'
</script>

<template>
  <Story title="Frame">
    <Variant title="Basic">
      <Basic />
    </Variant>
    <Variant title="SrcDoc">
      <SrcDoc />
    </Variant>
    <Variant title="Script">
      <Script />
    </Variant>
  </Story>
</template>
