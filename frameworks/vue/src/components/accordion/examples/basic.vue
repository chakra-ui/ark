<script setup lang="ts">
import { ref } from 'vue'
import { Accordion } from '../..'
import { ChevronDownIcon } from './icons'

const items = ref(['React'])
</script>

<template>
  <Accordion.Root lazyMount>
    <Accordion.Item v-for="item in items" :key="item" :value="item">
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
