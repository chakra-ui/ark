<script setup lang="ts">
import { ref } from 'vue'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../'

const items = ref(['React', 'Solid', 'Vue'])
const value = ref(['React'])
</script>

<template>
  <Story>
    <Variant title="Basic">
      <Accordion>
        <AccordionItem v-for="item in items" :key="item" :value="item">
          <AccordionTrigger>{{ item }} trigger</AccordionTrigger>
          <AccordionContent>{{ item }} content</AccordionContent>
        </AccordionItem>
      </Accordion>
    </Variant>
    <Variant title="Controlled">
      <Accordion v-model="value">
        <AccordionItem v-for="item in items" :key="item" :value="item">
          <AccordionTrigger>{{ item }} trigger</AccordionTrigger>
          <AccordionContent>{{ item }} content</AccordionContent>
        </AccordionItem>
      </Accordion>
    </Variant>
    <Variant title="Collapsible">
      <Accordion collapsible>
        <AccordionItem v-for="item in items" :key="item" :value="item">
          <AccordionTrigger>{{ item }} trigger</AccordionTrigger>
          <AccordionContent>{{ item }} content</AccordionContent>
        </AccordionItem>
      </Accordion>
    </Variant>
    <Variant title="Multiple">
      <Accordion multiple>
        <AccordionItem v-for="item in items" :key="item" :value="item">
          <AccordionTrigger>{{ item }} trigger</AccordionTrigger>
          <AccordionContent>{{ item }} content</AccordionContent>
        </AccordionItem>
      </Accordion>
    </Variant>
  </Story>
</template>
