<script setup lang="ts">
import AsyncLoading from './examples/async-loading.vue'
import Basic from './examples/basic.vue'
import ControlledExpanded from './examples/controlled-expanded.vue'
import ControlledSelected from './examples/controlled-selected.vue'
import Filtering from './examples/filtering.vue'
import RootProvider from './examples/root-provider.vue'
</script>

<template>
  <Story title="TreeView">
    <Variant title="Basic">
      <Basic />
    </Variant>
    <Variant title="RootProvider">
      <RootProvider />
    </Variant>
    <Variant title="AsyncLoading">
      <AsyncLoading />
    </Variant>
    <Variant title="ControlledExpanded">
      <ControlledExpanded />
    </Variant>
    <Variant title="ControlledSelected">
      <ControlledSelected />
    </Variant>
    <Variant title="Filtering">
      <Filtering />
    </Variant>
  </Story>
</template>
