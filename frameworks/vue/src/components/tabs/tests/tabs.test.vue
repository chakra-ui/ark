<script setup lang="ts">
import { ref } from 'vue'
import { Tabs } from '../'

const items = ref([
  { value: 'React' },
  { value: 'Solid' },
  { value: 'Svelte', disabled: true },
  { value: 'Vue' },
])
</script>
<template>
  <Tabs.Root>
    <Tabs.List>
      <Tabs.Trigger
        v-for="(item, idx) in items"
        :key="idx"
        :value="item.value"
        :disabled="item.disabled"
      >
        {{ item.value }} Trigger
      </Tabs.Trigger>
      <Tabs.Indicator />
    </Tabs.List>
    <Tabs.Content v-for="(item, idx) in items" :key="idx" :value="item.value">
      {{ item.value }} Content
    </Tabs.Content>
  </Tabs.Root>
</template>
