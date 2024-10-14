<script setup lang="ts">
import { Collapsible, useCollapsible } from '@ark-ui/vue/collapsible'

const collapsible = useCollapsible()
</script>

<template>
  <span>{{ collapsible.visible ? 'Visible' : 'Hidden' }}</span>

  <Collapsible.RootProvider :value="collapsible">
    <Collapsible.Trigger>Toggle</Collapsible.Trigger>
    <Collapsible.Content>Content</Collapsible.Content>
  </Collapsible.RootProvider>
</template>
