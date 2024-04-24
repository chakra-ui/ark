<script setup lang="ts">
import { Accordion, type AccordionRootEmits, type AccordionRootProps } from '../'
import { ChevronDownIcon } from './icons'

export interface AccordionProps extends AccordionRootProps {
  items: string[]
}

defineProps<AccordionProps>()
const emits = defineEmits<AccordionRootEmits>()
</script>

<template>
  <Accordion.Root>
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
  </Accordion.Root>
</template>
