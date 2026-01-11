<script setup lang="ts">
import { Menu, useMenu } from '@ark-ui/vue/menu'
import { ChevronDownIcon } from 'lucide-vue-next'
import button from 'styles/button.module.css'
import styles from 'styles/menu.module.css'

const menu = useMenu()
</script>

<template>
  <div class="stack">
    <button :class="button.Root" @click="menu.api.value.setHighlightedValue('copy')">Highlight Copy</button>
    <Menu.RootProvider :value="menu">
      <Menu.Trigger :class="styles.Trigger">
        Edit
        <Menu.Indicator :class="styles.Indicator">
          <ChevronDownIcon />
        </Menu.Indicator>
      </Menu.Trigger>
      <Menu.Positioner>
        <Menu.Content :class="styles.Content">
          <Menu.Item :class="styles.Item" value="cut">Cut</Menu.Item>
          <Menu.Item :class="styles.Item" value="copy">Copy</Menu.Item>
          <Menu.Item :class="styles.Item" value="paste">Paste</Menu.Item>
          <Menu.Item :class="styles.Item" value="delete">Delete</Menu.Item>
        </Menu.Content>
      </Menu.Positioner>
    </Menu.RootProvider>
  </div>
</template>
