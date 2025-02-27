<script setup lang="ts">
import { Collapsible } from '@ark-ui/vue/collapsible'
import { ref } from 'vue'

const open = ref(false)
</script>

<template>
  <Collapsible.Root v-model:open="open">
    <Collapsible.Trigger>Toggle {{ open }}</Collapsible.Trigger>
    <Collapsible.Content>Content</Collapsible.Content>
  </Collapsible.Root>
</template>
