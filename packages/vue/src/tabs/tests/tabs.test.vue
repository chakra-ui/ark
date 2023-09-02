<script setup lang="ts">
import { ref } from 'vue'
import { Tabs, TabTrigger, TabList, TabIndicator, TabContent } from '../'

const value = ref('one')
</script>
<template>
  <Tabs v-model="value">
    <TabList>
      <TabTrigger value="one">Tab 1</TabTrigger>
      <TabTrigger value="two">Tab 2</TabTrigger>
      <TabTrigger value="three" disabled> Tab 3 </TabTrigger>
      <TabIndicator />
    </TabList>
    <TabContent value="one">Content 1</TabContent>
    <TabContent value="two">Content 2</TabContent>
    <TabContent value="three">Content 3</TabContent>
  </Tabs>
</template>
