<script setup lang="ts">
import { ref } from 'vue'
import { Menu } from '../..'

const value = ref({
  framework: '',
  libraries: [],
})
</script>

<template>
  <Menu.Root>
    <Menu.Trigger>Open menu</Menu.Trigger>
    <Menu.Positioner>
      <Menu.Content>
        <Menu.Item id="new-tab">New Tab...</Menu.Item>
        <Menu.Item id="new-win">New Window...</Menu.Item>
        <Menu.Separator />
        <Menu.Root>
          <Menu.TriggerItem>Share &gt;</Menu.TriggerItem>
          <Menu.Positioner>
            <Menu.Content>
              <Menu.Item id="twitter">Twitter</Menu.Item>
              <Menu.Item id="message">Message</Menu.Item>
            </Menu.Content>
          </Menu.Positioner>
        </Menu.Root>
      </Menu.Content>
    </Menu.Positioner>
  </Menu.Root>
</template>
