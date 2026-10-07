<script setup lang="ts">
import { JsonTreeView } from '@ark-ui/vue/json-tree-view'

defineProps<{ customGuide?: boolean }>()
</script>

<template>
  <JsonTreeView.Root :data="{ user: { profile: { name: 'ark' } } }" :default-expanded-depth="Infinity">
    <JsonTreeView.Tree indent-guide>
      <template v-if="customGuide" #indentGuide>
        <div data-testid="custom-guide" />
      </template>
    </JsonTreeView.Tree>
  </JsonTreeView.Root>
</template>
