<script setup lang="ts">
import { ref } from 'vue'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  type AccordionProps,
} from '../index'

const items = ['panel-1', 'panel-2', 'panel-3']

const value = ref<AccordionProps['modelValue']>('panel-2')
</script>

<template>
  <div>Selected Value: {{ value }}</div>
  <button @click="value = 'panel-3'">Trigger</button>
  <Accordion v-model="value">
    <AccordionItem v-for="(item, idx) in items" :key="idx" :value="item">
      <AccordionTrigger>
        <button>{{ item }} trigger</button>
      </AccordionTrigger>
      <AccordionContent>{{ item }} content</AccordionContent>
    </AccordionItem>
  </Accordion>
</template>
