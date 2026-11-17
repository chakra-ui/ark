<script setup lang="ts">
import { Accordion } from '@ark-ui/vue/accordion'
</script>

<template>
  <Accordion.Root disabled>
    <Accordion.Item value="React">
      <Accordion.ItemTrigger>React Trigger</Accordion.ItemTrigger>
      <Accordion.ItemContent>React Content</Accordion.ItemContent>
    </Accordion.Item>
  </Accordion.Root>
</template>
