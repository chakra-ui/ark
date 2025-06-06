<script setup lang="ts">
import { Collapsible } from '@ark-ui/vue/collapsible'
import { ChevronDownIcon } from 'lucide-vue-next'
</script>

<template>
  <Collapsible.Root lazyMount unmountOnExit>
    <Collapsible.Trigger>
      Toggle
      <Collapsible.Indicator>
        <ChevronDownIcon />
      </Collapsible.Indicator>
    </Collapsible.Trigger>
    <Collapsible.Content>Content</Collapsible.Content>
  </Collapsible.Root>
</template>
