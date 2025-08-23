<script setup lang="ts">
import Dependencies from './examples/async-list/dependencies.vue'
import InfiniteLoading from './examples/async-list/infinite-loading.vue'
import Reload from './examples/async-list/reload.vue'
import Filter from './examples/async-list/filter.vue'
import SortClientSide from './examples/async-list/sort-client-side.vue'
import SortServerSide from './examples/async-list/sort-server-side.vue'
</script>

<template>
  <Story title="Utilities / Async List">
    <Variant title="Dependencies">
      <Dependencies />
    </Variant>
    <Variant title="InfiniteLoading">
      <InfiniteLoading />
    </Variant>
    <Variant title="Reload">
      <Reload />
    </Variant>
    <Variant title="Filter">
      <Filter />
    </Variant>
    <Variant title="SortClientSide">
      <SortClientSide />
    </Variant>
    <Variant title="SortServerSide">
      <SortServerSide />
    </Variant>
  </Story>
</template>
