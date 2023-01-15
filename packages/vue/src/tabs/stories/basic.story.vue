<script setup lang="ts">
import { Tabs, TabTrigger, TabList, TabIndicator, TabContent } from '../index'
const handleFocus = ({ value }: any) => console.log('focused', { value })
const handleChange = ({ value }: any) => console.log('change', { value })

// For use as a test prop. See `../tab.test.tsx`
defineProps({
  defaultValue: String,
})
</script>
<template>
  <Tabs @focus="handleFocus" @change="handleChange" :default-value="defaultValue">
    <TabList>
      <TabTrigger value="one">
        <button>Item one</button>
      </TabTrigger>
      <TabTrigger value="two" disabled>
        <button>Item two</button>
      </TabTrigger>
      <TabTrigger value="three">
        <button>Item three</button>
      </TabTrigger>
      <TabIndicator />
    </TabList>
    <TabContent value="one">Value item one</TabContent>
    <TabContent value="two">Value item two</TabContent>
    <TabContent value="three">Value item three</TabContent>
  </Tabs>
</template>
