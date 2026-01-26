<script setup lang="ts">
import { JsonTreeView, useJsonTreeView } from '@ark-ui/vue/json-tree-view'
import { ChevronRightIcon } from 'lucide-vue-next'
import styles from 'styles/json-tree-view.module.css'

const jsonTreeView = useJsonTreeView({
  defaultExpandedDepth: 1,
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

<template>
  <JsonTreeView.RootProvider :class="styles.Root" :value="jsonTreeView">
    <JsonTreeView.Tree :class="styles.Tree">
      <template #arrow>
        <ChevronRightIcon />
      </template>
    </JsonTreeView.Tree>
  </JsonTreeView.RootProvider>
</template>
