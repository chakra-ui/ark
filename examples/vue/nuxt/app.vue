<script setup lang="ts">
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@ark-ui/vue'
import { ref } from 'vue'

const val = ref('panel-2')
</script>

<template>
  <button @click="val = 'panel-3'">Trigger</button>
  <Accordion v-model="val">
    <AccordionItem value="panel-1">
      <AccordionTrigger>
        <button>Panel 1 trigger</button>
      </AccordionTrigger>
      <AccordionContent>Much content to fit here 1</AccordionContent>
    </AccordionItem>
    <AccordionItem value="panel-2">
      <AccordionTrigger>
        <button>Panel 2 trigger</button>
      </AccordionTrigger>
      <AccordionContent>Much content to fit here 2</AccordionContent>
    </AccordionItem>
    <AccordionItem value="panel-3">
      <AccordionTrigger>
        <button>Panel 3 trigger</button>
      </AccordionTrigger>
      <AccordionContent>Much content to fit here 3</AccordionContent>
    </AccordionItem>
  </Accordion>
</template>
