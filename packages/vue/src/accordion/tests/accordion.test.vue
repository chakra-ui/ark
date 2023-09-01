<script setup lang="ts">
import { ref } from 'vue'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../'

const items = ref(['React', 'Solid', 'Vue'])
const value = ref(['React'])
</script>

<template>
  <Accordion v-model="value">
    <AccordionItem v-for="item in items" :key="item" :value="item">
      <AccordionTrigger>{{ item }} trigger</AccordionTrigger>
      <AccordionContent>{{ item }} content</AccordionContent>
    </AccordionItem>
  </Accordion>
</template>
