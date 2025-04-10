<script setup lang="ts">
import { Menu } from '@ark-ui/vue/menu'

const items = [
  { value: 'react', label: 'React' },
  { value: 'solid', label: 'Solid' },
  { value: 'vue', label: 'Vue' },
]
</script>

<template>
  <Menu.Root @select="(e) => console.log('[root] selected item', e.value)">
    <Menu.Trigger>
      Open menu
      <Menu.Indicator>➡️</Menu.Indicator>
    </Menu.Trigger>
    <Menu.Positioner>
      <Menu.Content>
        <Menu.Item
          v-for="item in items"
          :key="item.value"
          :value="item.value"
          @select="() => console.log('[item] selected item', item.value)"
        >
          {{ item.label }}
        </Menu.Item>
      </Menu.Content>
    </Menu.Positioner>
  </Menu.Root>
</template>
