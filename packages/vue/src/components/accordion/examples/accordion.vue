<script setup lang="ts">
import { Accordion, type AccordionRootEmits, type AccordionRootProps } from '../'
import { useForwardPropsEmits } from '../../../utils'
import { ChevronDownIcon } from './icons'

export interface AccordionProps extends AccordionRootProps {
  items: string[]
}

const props = defineProps<AccordionProps>()
const emits = defineEmits<AccordionRootEmits>()

const forwarded = useForwardPropsEmits(props, emits)
</script>

<template>
  <Accordion.Root v-bind="forwarded">
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
