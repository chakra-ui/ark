<script setup lang="ts">
import {
  Accordion,
  type AccordionRootEmits,
  type AccordionRootProps,
  useForwardPropsEmits,
} from '@ark-ui/vue'
import { ChevronDownIcon } from 'lucide-vue-next'

export interface AccordionProps extends AccordionRootProps {
  items: string[]
}

const props = defineProps<AccordionProps>()
const emits = defineEmits<AccordionRootEmits>()

const forwarded = useForwardPropsEmits(props, emits)
const id = useId()
</script>

<template>
  <Accordion.Root :id="id" v-bind="forwarded">
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
