<script lang="ts" setup>
import { Menu } from '../'
</script>

<template>
  <Menu.Root>
    <Menu.Trigger>Open menu</Menu.Trigger>
    <Menu.Positioner>
      <Menu.Content>
        <span>main menu content</span>
        <Menu.Separator />
        <Menu.Root>
          <Menu.TriggerItem>Share...</Menu.TriggerItem>
          <Menu.Positioner>
            <Menu.Content>
              <span>nested menu content</span>
              <Menu.Item value="twitter">Twitter</Menu.Item>
              <Menu.Item value="message">Message</Menu.Item>
            </Menu.Content>
          </Menu.Positioner>
        </Menu.Root>
      </Menu.Content>
    </Menu.Positioner>
  </Menu.Root>
</template>
