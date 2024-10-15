<script setup lang="ts">
import { Accordion } from '@ark-ui/vue/accordion'
import { ref } from 'vue'
import { ChevronDownIcon } from './icons'

const items = ref([{ value: 'React' }, { value: 'Solid', disabled: true }, { value: 'Vue' }])
</script>

<template>
  <Accordion.Root :defaultValue="['React']">
    <Accordion.Context v-slot="context">
      <b>Vue State:</b>
      <span>Disabled: {{ context.getItemState(items[2]).disabled ? 'Y' : 'N' }}</span>
      <span>Expanded: {{ context.getItemState(items[2]).expanded ? 'Y' : 'N' }}</span>
      <span>Focused: {{ context.getItemState(items[2]).focused ? 'Y' : 'N' }}</span>
    </Accordion.Context>
    <Accordion.Item v-for="item in items" :key="item.value" v-bind="item">
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
