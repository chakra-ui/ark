<script setup lang="ts">
import { Accordion } from '@ark-ui/vue/accordion'
import { ref } from 'vue'

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
