<script setup lang="ts">
import { Accordion, useAccordion } from '@ark-ui/vue/accordion'
import { ref } from 'vue'
import { ChevronDownIcon } from './icons'

const accordion = useAccordion({
  multiple: true,
  onValueChange: (details) => console.log(details),
})

const items = ref(['React', 'Solid', 'Vue'])
</script>

<template>
  <Accordion.RootProvider :value="accordion">
    <Accordion.Item v-for="item in items" :key="item" :value="item">
      <Accordion.ItemTrigger>
        What is {{ item }}?
        <Accordion.ItemIndicator>
          <ChevronDownIcon />
        </Accordion.ItemIndicator>
      </Accordion.ItemTrigger>
      <Accordion.ItemContent>
        {{ item }} is a JavaScript library for building user interfaces.
      </Accordion.ItemContent>
    </Accordion.Item>
  </Accordion.RootProvider>
</template>
