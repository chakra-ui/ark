<script setup lang="ts">
import { Menu, useMenu } from '@ark-ui/vue/menu'

const menu = useMenu()
</script>

<template>
  <button @click="menu.api.value.setHighlightedValue('solid')">Highlight Solid</button>

  <Menu.Root>
    <Menu.Trigger>
      Open menu
      <Menu.Indicator>➡️</Menu.Indicator>
    </Menu.Trigger>
    <Menu.Positioner>
      <Menu.Content>
        <Menu.Item value="react">React</Menu.Item>
        <Menu.Item value="solid">Solid</Menu.Item>
        <Menu.Item value="vue">Vue</Menu.Item>
      </Menu.Content>
    </Menu.Positioner>
  </Menu.Root>
</template>
