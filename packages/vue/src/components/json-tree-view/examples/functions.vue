<script setup lang="ts">
import { JsonTreeView } from '@ark-ui/vue/json-tree-view'
import { ChevronRightIcon } from 'lucide-vue-next'

const data = [
  function sum(a: number, b: number) {
    return a + b
  },
  async (promises: Promise<any>[]) => await Promise.all(promises),
  function* generator(a: number) {
    while (a > 0) {
      yield a - 1
    }
  },
]
</script>

<template>
  <JsonTreeView.Root :data="data">
    <JsonTreeView.Tree>
      <template #arrow>
        <ChevronRightIcon />
      </template>
    </JsonTreeView.Tree>
  </JsonTreeView.Root>
</template>
