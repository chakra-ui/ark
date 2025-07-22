<template>
  <JsonTreeViewRootProvider :value="jsonTreeView">
    <JsonTreeViewTree>
      <template #arrow>
        <ChevronRightIcon />
      </template>
    </JsonTreeViewTree>
  </JsonTreeViewRootProvider>
</template>

<script setup lang="ts">
import { useJsonTreeView } from '@ark-ui/vue/json-tree-view'
import { JsonTreeViewRootProvider, JsonTreeViewTree } from '@ark-ui/vue/json-tree-view'
import { ChevronRightIcon } from 'lucide-vue-next'

const jsonTreeView = useJsonTreeView({
  data: {
    name: 'John Doe',
    age: 30,
    email: 'john.doe@example.com',
    tags: ['tag1', 'tag2', 'tag3'],
    address: {
      street: '123 Main St',
      city: 'Anytown',
      state: 'CA',
      zip: '12345',
    },
  },
})
</script>
