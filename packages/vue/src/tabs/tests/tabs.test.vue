<script setup lang="ts">
import { ref } from 'vue'
import { Tabs, TabTrigger, TabList, TabIndicator, TabContent } from '../'

const items = ref([
  { value: 'React' },
  { value: 'Solid' },
  { value: 'Svelte', disabled: true },
  { value: 'Vue' },
])
</script>
<template>
  <Tabs>
    <TabList>
      <TabTrigger
        v-for="item in items"
        :key="item.value"
        :value="item.value"
        :disabled="item.disabled"
        >{{ item.value }} Trigger</TabTrigger
      >
      <TabIndicator />
    </TabList>
    <TabContent v-for="item in items" :key="item.value" :value="item.value">
      {{ item.value }} Content</TabContent
    >
  </Tabs>
</template>
