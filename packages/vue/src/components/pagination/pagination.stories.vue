<script setup lang="ts">
import Basic from './examples/basic.vue'
import Context from './examples/context.vue'
import Customized from './examples/customized.vue'
import DataSlicing from './examples/data-slicing.vue'
import PageRange from './examples/page-range.vue'
import PageSizeControl from './examples/page-size-control.vue'
import RootProvider from './examples/root-provider.vue'
</script>
<template>
  <Story title="Pagination">
    <Variant title="Basic">
      <Basic />
    </Variant>
    <Variant title="Context">
      <Context />
    </Variant>
    <Variant title="Customized">
      <Customized />
    </Variant>
    <Variant title="DataSlicing">
      <DataSlicing />
    </Variant>
    <Variant title="PageRange">
      <PageRange />
    </Variant>
    <Variant title="PageSizeControl">
      <PageSizeControl />
    </Variant>
    <Variant title="RootProvider">
      <RootProvider />
    </Variant>
  </Story>
</template>
