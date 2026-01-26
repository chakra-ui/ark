<script setup lang="ts">
import { Menu } from '@ark-ui/vue/menu'
import { ChevronDownIcon } from 'lucide-vue-next'
import styles from 'styles/menu.module.css'
</script>

<template>
  <Menu.Root>
    <Menu.Trigger :class="styles.Trigger">
      Edit
      <Menu.Indicator :class="styles.Indicator">
        <ChevronDownIcon />
      </Menu.Indicator>
    </Menu.Trigger>
    <Menu.Positioner>
      <Menu.Content :class="styles.Content">
        <Menu.ItemGroup :class="styles.ItemGroup">
          <Menu.ItemGroupLabel :class="styles.ItemGroupLabel">Clipboard</Menu.ItemGroupLabel>
          <Menu.Item :class="styles.Item" value="cut">Cut</Menu.Item>
          <Menu.Item :class="styles.Item" value="copy">Copy</Menu.Item>
          <Menu.Item :class="styles.Item" value="paste">Paste</Menu.Item>
        </Menu.ItemGroup>
        <Menu.ItemGroup :class="styles.ItemGroup">
          <Menu.ItemGroupLabel :class="styles.ItemGroupLabel">Selection</Menu.ItemGroupLabel>
          <Menu.Item :class="styles.Item" value="select-all">Select All</Menu.Item>
          <Menu.Item :class="styles.Item" value="deselect">Deselect</Menu.Item>
        </Menu.ItemGroup>
      </Menu.Content>
    </Menu.Positioner>
  </Menu.Root>
</template>
