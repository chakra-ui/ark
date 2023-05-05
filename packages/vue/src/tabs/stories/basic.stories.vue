<script setup lang="ts">
import { ref } from 'vue'
import { Tabs, TabTrigger, TabList, TabIndicator, TabContent } from '../index'

const focusedVal = ref()
const changedVal = ref()

const handleFocus = ({ value }: any) => (focusedVal.value = value)
const handleChange = ({ value }: any) => (changedVal.value = value)

// For use as a test prop. See `../tab.test.tsx`
defineProps({
  defaultValue: String,
})
</script>
<template>
  <div><span>Focused: </span> {{ focusedVal }}</div>
  <div data-testid="change-content"><span>Changed: </span> {{ changedVal }}</div>
  <Tabs
    activation-mode="manual"
    @focus="handleFocus"
    @change="handleChange"
    :default-value="defaultValue"
    v-slot="{ selectedValue, focusedValue }"
  >
    <TabList
      data-testid="tablist"
      :data-test-selected-value="selectedValue"
      :data-test-focused-value="focusedValue"
    >
      <TabTrigger value="one" tabindex="0">
        <button>Item one</button>
      </TabTrigger>
      <TabTrigger value="two" disabled>
        <button>Item two</button>
      </TabTrigger>
      <TabTrigger value="three" tabindex="0">
        <button>Item three</button>
      </TabTrigger>
      <TabIndicator />
    </TabList>
    <TabContent value="one">Value item one</TabContent>
    <TabContent value="two">Value item two</TabContent>
    <TabContent value="three">Value item three</TabContent>
  </Tabs>
</template>
<style>
[data-part='trigger']:focus {
  outline: 1px solid blue;
}
</style>
