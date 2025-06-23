<template>
  <Accordion.Root :defaultValue="['React']">
    <Accordion.Item v-for="item in ['React', 'Solid', 'Vue']" :key="item" :value="item">
      <Accordion.ItemTrigger>
        What is {{ item }}?
        <Accordion.ItemIndicator>
          <ChevronDownIcon />
        </Accordion.ItemIndicator>
        <Accordion.ItemContext v-slot="context">
          <div style="display: inline-flex; gap: 0.5rem">
            <span>Expanded: {{ context.expanded }}</span>
            <span>Focused: {{ context.focused }}</span>
            <span>Disabled: {{ context.disabled }}</span>
          </div>
        </Accordion.ItemContext>
      </Accordion.ItemTrigger>
      <Accordion.ItemContent>{{ item }} is a JavaScript library for building user interfaces.</Accordion.ItemContent>
    </Accordion.Item>
  </Accordion.Root>
</template>

<script setup lang="ts">
import { Accordion } from '@ark-ui/vue/accordion'
import { ChevronDownIcon } from 'lucide-vue-next'
</script>
