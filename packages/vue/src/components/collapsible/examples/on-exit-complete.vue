<script setup lang="ts">
import { Collapsible } from '@ark-ui/vue/collapsible'
</script>

<template>
  <Collapsible.Root @exit-complete="() => console.log('on exit')">
    <Collapsible.Trigger>Toggle</Collapsible.Trigger>
    <Collapsible.Content>Content</Collapsible.Content>
  </Collapsible.Root>
</template>
