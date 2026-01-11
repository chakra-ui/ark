<script setup lang="ts">
import { Menu } from '@ark-ui/vue/menu'
import { ChevronDownIcon } from 'lucide-vue-next'
import styles from 'styles/menu.module.css'
</script>

<template>
  <Menu.Root>
    <Menu.Trigger :class="styles.Trigger">
      Settings
      <Menu.Indicator :class="styles.Indicator">
        <ChevronDownIcon />
      </Menu.Indicator>
    </Menu.Trigger>
    <Menu.Positioner>
      <Menu.Content :class="styles.Content">
        <Menu.Item :class="styles.Item" value="profile">
          <Menu.ItemContext v-slot="item">
            <span :style="{ fontWeight: item.highlighted ? 600 : 400 }">Profile Settings</span>
          </Menu.ItemContext>
        </Menu.Item>
        <Menu.Item :class="styles.Item" value="preferences">Preferences</Menu.Item>
        <Menu.Item :class="styles.Item" value="notifications">Notifications</Menu.Item>
        <Menu.Separator :class="styles.Separator" />
        <Menu.Item :class="styles.Item" value="logout">Log Out</Menu.Item>
      </Menu.Content>
    </Menu.Positioner>
  </Menu.Root>
</template>
