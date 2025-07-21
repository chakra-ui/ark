<script setup lang="ts">
import { JsonTreeView } from '@ark-ui/vue/json-tree-view'
import { ChevronRightIcon } from 'lucide-vue-next'

const data = new Error('Error')
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
