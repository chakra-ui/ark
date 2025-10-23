<script setup>
import Basic from './examples/basic.vue'
import Callback from './examples/callback.vue'
import RootProvider from './examples/root-provider.vue'
</script>

<template>
  <Story title="Sizer">
    <Variant title="Basic">
      <Basic />
    </Variant>
    <Variant title="Callback">
      <Callback />
    </Variant>
    <Variant title="RootProvider">
      <RootProvider />
    </Variant>
  </Story>
</template>
