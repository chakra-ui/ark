<script setup lang="ts">
import { ChevronDownIcon } from 'lucide-vue-next'
import { ref } from 'vue'
import { Accordion } from '../..'

const items = ref(['React', 'Solid', 'Vue'])
const value = ref(['React'])
</script>

<template>
  <Accordion.Root multiple>
    <Accordion.Item v-for="item in items" :key="item" :value="item">
      <Accordion.ItemTrigger>
        What is {{ item }}?
        <Accordion.ItemIndicator><ChevronDownIcon /></Accordion.ItemIndicator>
      </Accordion.ItemTrigger>
      <Accordion.ItemContent
        >{{ item }} is a JavaScript library for building user interfaces.</Accordion.ItemContent
      >
    </Accordion.Item>
  </Accordion.Root>
</template>
