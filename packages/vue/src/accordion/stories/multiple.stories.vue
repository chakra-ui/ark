<script setup lang="ts">
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../index'

const items = ['panel-1', 'panel-2', 'panel-3']
</script>

<template>
  <Accordion multiple>
    <AccordionItem v-for="(item, idx) in items" :key="idx" :value="item">
      <AccordionTrigger>
        <button>{{ item }} trigger</button>
      </AccordionTrigger>
      <AccordionContent>{{ item }} content</AccordionContent>
    </AccordionItem>
  </Accordion>
</template>
