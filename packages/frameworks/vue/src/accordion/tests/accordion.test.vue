<script setup lang="ts">
import { ref } from 'vue'
import { Accordion, AccordionItem, AccordionItemContent, AccordionItemTrigger } from '../'

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
      <AccordionItemTrigger>{{ item.value }} Trigger</AccordionItemTrigger>
      <AccordionItemContent>{{ item.value }} Content</AccordionItemContent>
    </AccordionItem>
  </Accordion>
</template>
