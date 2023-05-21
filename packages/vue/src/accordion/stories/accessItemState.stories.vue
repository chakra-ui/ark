<script setup lang="ts">
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  type AccordionItemContext,
} from '../index'

const items = ['panel-1', 'panel-2', 'panel-3']
</script>

<template>
  <Accordion defaultValue="panel-1" multiple>
    <AccordionItem
      v-for="(item, idx) in items"
      :key="idx"
      :value="item"
      v-slot="{ isOpen }: AccordionItemContext"
    >
      <AccordionTrigger>
        <button>{{ isOpen ? 'Close' : 'Open' }}</button>
      </AccordionTrigger>
      <AccordionContent>{{ item }} content</AccordionContent>
    </AccordionItem>
  </Accordion>
</template>
