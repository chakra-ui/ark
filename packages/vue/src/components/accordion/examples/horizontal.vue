<script setup lang="ts">
import { Accordion } from '@ark-ui/vue/accordion'
import { ChevronRightIcon } from 'lucide-vue-next'
import { ref } from 'vue'

const items = ref(['React', 'Solid', 'Vue'])
</script>

<template>
  <Accordion.Root :defaultValue="['React']" orientation="horizontal">
    <Accordion.Item v-for="item in items" :key="item" :value="item">
      <Accordion.ItemTrigger>
        What is {{ item }}?
        <Accordion.ItemIndicator>
          <ChevronRightIcon />
        </Accordion.ItemIndicator>
      </Accordion.ItemTrigger>
      <Accordion.ItemContent>
        {{ item }} is a JavaScript library for building user interfaces.
      </Accordion.ItemContent>
    </Accordion.Item>
  </Accordion.Root>
</template>
