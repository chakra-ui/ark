<script setup lang="ts">
import Basic from './examples/basic.vue'
import Customized from './examples/customized.vue'
import RootProvider from './examples/root-provider.vue'
</script>
<template>
  <Story title="Pagination">
    <Variant title="Basic">
      <Basic />
    </Variant>
    <Variant title="Customized">
      <Customized />
    </Variant>
    <Variant title="RootProvider">
      <RootProvider />
    </Variant>
  </Story>
</template>
