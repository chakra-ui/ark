<script setup lang="ts">
import { Menu } from '../..'
</script>

<template>
  <Menu.Root>
    <Menu.Context v-slot="menu">
      <Menu.Trigger>Menu is {{ menu.open ? 'open' : 'closed' }}</Menu.Trigger>
    </Menu.Context>
    <Menu.Positioner>
      <Menu.Content>
        <Menu.Item value="react">
          <Menu.ItemContext v-slot="item">
            React is {{ item.highlighted ? 'highlighted' : 'not highlighted' }}
          </Menu.ItemContext>
        </Menu.Item>
        <Menu.Item value="solid">Solid</Menu.Item>
        <Menu.Item value="vue">Vue</Menu.Item>
      </Menu.Content>
    </Menu.Positioner>
  </Menu.Root>
</template>
