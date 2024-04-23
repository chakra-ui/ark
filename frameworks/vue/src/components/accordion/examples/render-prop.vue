<script setup lang="ts">
import { ref } from 'vue'
import { Accordion } from '../..'

const items = ref(['React', 'Solid', 'Vue'])
</script>

<template>
  <Accordion.Root>
    <Accordion.Item v-for="item in items" :key="item" :value="item">
      <Accordion.ItemContext v-slot="{ expanded }">
        <Accordion.ItemTrigger>{{ expanded ? 'Expanded' : 'Closed' }}</Accordion.ItemTrigger>
        <Accordion.ItemContent>{{ item }} content</Accordion.ItemContent>
      </Accordion.ItemContext>
    </Accordion.Item>
  </Accordion.Root>
</template>
