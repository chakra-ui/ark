<script setup lang="ts">
import { JsonTreeView } from '@ark-ui/vue/json-tree-view'
import { ChevronRightIcon } from 'lucide-vue-next'
import styles from 'styles/json-tree-view.module.css'

const data = Object.assign(new Error('Could not load user'), {
  stack: 'Error: Could not load user\n    at fetchUser (api.ts:12:9)\n    at loadProfile (profile.ts:4:3)',
})
</script>

<template>
  <JsonTreeView.Root :class="styles.Root" :data="data" :defaultExpandedDepth="1">
    <JsonTreeView.Tree :class="styles.Tree">
      <template #arrow>
        <ChevronRightIcon />
      </template>
    </JsonTreeView.Tree>
  </JsonTreeView.Root>
</template>
