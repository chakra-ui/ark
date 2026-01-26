<script setup lang="ts">
import { Menu } from '@ark-ui/vue/menu'
import { ChevronDownIcon } from 'lucide-vue-next'
import styles from 'styles/menu.module.css'

const items = [
  { value: 'profile', label: 'My Profile' },
  { value: 'settings', label: 'Settings' },
  { value: 'billing', label: 'Billing' },
  { value: 'logout', label: 'Log Out' },
]
</script>

<template>
  <Menu.Root @select="(e) => console.log('Selected:', e.value)">
    <Menu.Trigger :class="styles.Trigger">
      Account
      <Menu.Indicator :class="styles.Indicator">
        <ChevronDownIcon />
      </Menu.Indicator>
    </Menu.Trigger>
    <Menu.Positioner>
      <Menu.Content :class="styles.Content">
        <Menu.Item
          v-for="item in items"
          :key="item.value"
          :class="styles.Item"
          :value="item.value"
          @select="() => console.log('Item selected:', item.label)"
        >
          {{ item.label }}
        </Menu.Item>
      </Menu.Content>
    </Menu.Positioner>
  </Menu.Root>
</template>
