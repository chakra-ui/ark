<script setup lang="ts">
import { CollapsibleContent, CollapsibleRoot, CollapsibleTrigger } from '..'
</script>

<template>
  <CollapsibleRoot @exit-complete="() => console.log('on exit')">
    <CollapsibleTrigger>Toggle</CollapsibleTrigger>
    <CollapsibleContent>Content</CollapsibleContent>
  </CollapsibleRoot>
</template>