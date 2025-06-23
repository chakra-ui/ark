<template>
  <Accordion.Root :defaultValue="['React']">
    <Accordion.Context v-slot="context">
      <div>
        <span>Selected items: {{ context.value.join(', ') }}</span>
        <span>Focused item: {{ context.focusedValue }}</span>
        <button @click="context.setValue(['React', 'Solid'])">Set value</button>
      </div>
    </Accordion.Context>

    <Accordion.Item v-for="item in ['React', 'Solid', 'Vue']" :key="item" :value="item">
      <Accordion.ItemTrigger>
        What is {{ item }}?
        <Accordion.ItemIndicator>
          <ChevronDownIcon />
        </Accordion.ItemIndicator>
      </Accordion.ItemTrigger>
      <Accordion.ItemContent>{{ item }} is a JavaScript library for building user interfaces.</Accordion.ItemContent>
    </Accordion.Item>
  </Accordion.Root>
</template>

<script setup lang="ts">
import { Accordion } from '@ark-ui/vue/accordion'
import { ChevronDownIcon } from 'lucide-vue-next'
</script>
