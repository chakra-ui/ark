<script setup lang="ts">
import { ref } from 'vue'
import { Accordion } from '../'

const items = ref([
  { value: 'React' },
  { value: 'Solid' },
  { value: 'Svelte', disabled: true },
  { value: 'Vue' },
])
const testProps = ref<string[]>([])
</script>

<template>
  <Accordion v-model="testProps">
    <Accordion.Item
      v-for="item in items"
      :key="item.value"
      :value="item.value"
      :disabled="item.disabled"
    >
      <Accordion.ItemTrigger>
        {{ item }} trigger
        <Accordion.ItemIndicator>{{ '>' }}</Accordion.ItemIndicator>
      </Accordion.ItemTrigger>
      <Accordion.ItemContent>{{ item.value }} Content</Accordion.ItemContent>
    </Accordion.Item>
  </Accordion>
</template>
