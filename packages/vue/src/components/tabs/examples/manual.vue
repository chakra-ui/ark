<script setup lang="ts">
import { Tabs } from '@ark-ui/vue/tabs'
import { ref } from 'vue'

const value = ref('react')
</script>

<template>
  <Tabs.Root v-model="value" activationMode="manual">
    <Tabs.List>
      <Tabs.Trigger value="react">React</Tabs.Trigger>
      <Tabs.Trigger value="vue">Vue</Tabs.Trigger>
      <Tabs.Trigger value="solid">Solid</Tabs.Trigger>
    </Tabs.List>
    <Tabs.Content value="react">React Content</Tabs.Content>
    <Tabs.Content value="vue">Vue Content</Tabs.Content>
    <Tabs.Content value="solid">Solid Content</Tabs.Content>
  </Tabs.Root>
</template>
