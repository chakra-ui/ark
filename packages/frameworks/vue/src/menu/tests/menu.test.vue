<script setup lang="ts">
import { Menu } from '../'
</script>

<template>
  <Menu.Root v-slot="{ isOpen }">
    <Menu.Trigger>{{ isOpen ? 'Close' : 'Open' }} menu</Menu.Trigger>
    <Menu.Positioner data-testid="positioner">
      <Menu.Content>
        <span>main menu content</span>
        <Menu.Item id="search">Search</Menu.Item>
        <Menu.Item id="undo">Undo</Menu.Item>
        <Menu.Item id="delivery" disabled>Delivery</Menu.Item>
        <Menu.Item id="unlink">Unlink</Menu.Item>
      </Menu.Content>
    </Menu.Positioner>
  </Menu.Root>
</template>
