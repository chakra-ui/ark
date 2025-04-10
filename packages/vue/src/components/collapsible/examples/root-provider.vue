<script setup lang="ts">
import { Collapsible, useCollapsible } from '@ark-ui/vue/collapsible'
import { ChevronDownIcon } from 'lucide-vue-next'

const collapsible = useCollapsible()
</script>

<template>
  <span>{{ collapsible.visible ? 'Visible' : 'Hidden' }}</span>

  <Collapsible.RootProvider :value="collapsible">
    <Collapsible.Trigger>
      Toggle
      <Collapsible.Indicator>
        <ChevronDownIcon />
      </Collapsible.Indicator>
    </Collapsible.Trigger>
    <Collapsible.Content>Content</Collapsible.Content>
  </Collapsible.RootProvider>
</template>
