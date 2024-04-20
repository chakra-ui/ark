<script setup lang="ts">
import { ChevronDownIcon } from 'lucide-vue-next'
import { ref } from 'vue'
import { Accordion } from '../..'

const items = ref(['React', 'Solid', 'Vue'])
const value = ref(['React'])
</script>

<template>
  <Accordion.Root>
    <Accordion.Item v-for="item in items" :key="item" :value="item" v-slot="{ isOpen }">
      <Accordion.ItemTrigger>{{ isOpen ? 'Close' : 'Open' }}</Accordion.ItemTrigger>
      <Accordion.ItemContent>{{ item }} content</Accordion.ItemContent>
    </Accordion.Item>
  </Accordion.Root>
</template>
