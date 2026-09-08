<script setup lang="ts">
import { Accordion, type AccordionRootProps } from '@ark-ui/vue/accordion'

const props = defineProps<AccordionRootProps>()
</script>

<template>
  <Accordion.Root v-bind="props">
    <Accordion.Item value="react">
      <Accordion.ItemTrigger>React Trigger</Accordion.ItemTrigger>
      <Accordion.ItemContent>React Content</Accordion.ItemContent>
    </Accordion.Item>
  </Accordion.Root>
</template>
