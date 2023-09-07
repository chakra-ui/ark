<script setup lang="ts">
import { ref } from 'vue'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../'

const items = ref([
  { value: 'React' },
  { value: 'Solid' },
  { value: 'Svelte', disabled: true },
  { value: 'Vue' },
])
const testProps = ref<string[]>([])
</script>

<template>
  <Accordion v-model="testProps">
    <AccordionItem
      v-for="item in items"
      :key="item.value"
      :value="item.value"
      :disabled="item.disabled"
    >
      <AccordionTrigger>{{ item.value }} Trigger</AccordionTrigger>
      <AccordionContent>{{ item.value }} Content</AccordionContent>
    </AccordionItem>
  </Accordion>
</template>
