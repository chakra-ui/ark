<script setup lang="ts">
import { Tabs, TabTrigger, TabList, TabIndicator, TabContent } from '../index'
</script>
<template>
  <Story title="Tabs - With Default Value">
    <Tabs defaultValue="three">
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
  </Story>
</template>
