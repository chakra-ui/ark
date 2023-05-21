<script setup lang="ts">
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../index'
</script>

<template>
  <Accordion defaultValue="panel-2">
    <AccordionItem value="panel-1">
      <AccordionTrigger><button>Panel 1 trigger</button></AccordionTrigger>
      <AccordionContent>Panel 1 content</AccordionContent>
    </AccordionItem>

    <AccordionItem value="panel-2">
      <AccordionTrigger><button>Panel 2 trigger</button></AccordionTrigger>
      <AccordionContent>Panel 2 content</AccordionContent>
    </AccordionItem>
  </Accordion>
</template>
