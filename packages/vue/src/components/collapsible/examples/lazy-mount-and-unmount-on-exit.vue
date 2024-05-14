<script setup lang="ts">
import { Collapsible } from '..'
</script>

<template>
  <Collapsible.Root lazyMount unmountOnExit>
    <Collapsible.Trigger>Toggle</Collapsible.Trigger>
    <Collapsible.Content>Content</Collapsible.Content>
  </Collapsible.Root>
</template>
