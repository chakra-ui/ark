<script setup lang="ts">
import { Accordion, type UseAccordionProps, useAccordion } from '@ark-ui/vue/accordion'
import { ChevronRightIcon } from 'lucide-vue-next'
import { computed, ref } from 'vue'

const items = ref(['React', 'Solid', 'Vue'])
const value = ref(['React'])

const accordionProps = computed<UseAccordionProps>(() => ({
  multiple: true,
  value: value.value,
  // biome-ignore lint/suspicious/noAssignInExpressions: <explanation>
  onValueChange: (e) => (value.value = e.value),
}))

const accordion = useAccordion(accordionProps)
</script>

<template>
  <button @click="accordion.setValue(['Vue'])">Set to Vue</button>

  <Accordion.RootProvider :value="accordion">
    <Accordion.Item v-for="item in items" :key="item" :value="item">
      <Accordion.ItemTrigger>
        What is {{ item }}?
        <Accordion.ItemIndicator>
          <ChevronRightIcon />
        </Accordion.ItemIndicator>
      </Accordion.ItemTrigger>
      <Accordion.ItemContent>{{ item }} is a JavaScript library for building user interfaces.</Accordion.ItemContent>
    </Accordion.Item>
  </Accordion.RootProvider>
</template>
