<script setup lang="ts">
import Basic from './examples/basic.vue'
import Context from './examples/context.vue'
import Controlled from './examples/controlled.vue'
import RootProvider from './examples/root-provider.vue'
</script>
<template>
  <Story title="Clipboard">
    <Variant title="Basic">
      <Basic />
    </Variant>
    <Variant title="Context">
      <Context />
    </Variant>
    <Variant title="Controlled">
      <Controlled />
    </Variant>
    <Variant title="RootProvider">
      <RootProvider />
    </Variant>
  </Story>
</template>
