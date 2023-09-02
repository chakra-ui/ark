<script setup lang="ts">
import { ref } from 'vue'
import { Tabs, TabTrigger, TabList, TabIndicator, TabContent } from './'
import './tabs.css'
const value = ref('react')
</script>
<template>
  <Story title="Tabs">
    <Variant title="Basic">
      <Tabs>
        <TabList>
          <TabTrigger value="react">React</TabTrigger>
          <TabTrigger value="vue">Vue</TabTrigger>
          <TabTrigger value="solid">Solid</TabTrigger>
          <TabIndicator />
        </TabList>
        <TabContent value="react">React Content</TabContent>
        <TabContent value="vue">Vue Content</TabContent>
        <TabContent value="solid">Solid Content</TabContent>
      </Tabs>
    </Variant>
    <Variant title="InitialTab">
      <Tabs v-model="value">
        <TabList>
          <TabTrigger value="react">React</TabTrigger>
          <TabTrigger value="vue">Vue</TabTrigger>
          <TabTrigger value="solid">Solid</TabTrigger>
          <TabIndicator />
        </TabList>
        <TabContent value="react">React Content</TabContent>
        <TabContent value="vue">Vue Content</TabContent>
        <TabContent value="solid">Solid Content</TabContent>
      </Tabs>
    </Variant>
    <Variant title="Disabled">
      <Tabs v-model="value">
        <TabList>
          <TabTrigger value="react">React</TabTrigger>
          <TabTrigger value="vue" disabled>Vue</TabTrigger>
          <TabTrigger value="solid">Solid</TabTrigger>
        </TabList>
        <TabContent value="react">React Content</TabContent>
        <TabContent value="vue">Vue Content</TabContent>
        <TabContent value="solid">Solid Content</TabContent>
      </Tabs>
    </Variant>
    <Variant title="Vertical" orientation="vertical">
      <Tabs v-model="value" orientation="vertical">
        <TabList>
          <TabTrigger value="react">React</TabTrigger>
          <TabTrigger value="vue">Vue</TabTrigger>
          <TabTrigger value="solid">Solid</TabTrigger>
          <TabIndicator />
        </TabList>
        <TabContent value="react">React Content</TabContent>
        <TabContent value="vue">Vue Content</TabContent>
        <TabContent value="solid">Solid Content</TabContent>
      </Tabs>
    </Variant>
  </Story>
</template>
