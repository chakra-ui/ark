<script setup lang="ts">
import { Menu } from '@ark-ui/vue/menu'
import { Menubar } from '@ark-ui/vue/menubar'
import { Teleport } from 'vue'
import menu from 'styles/menu.module.css'
import styles from 'styles/menubar.module.css'
</script>

<template>
  <Menubar.Root :class="styles.Root" orientation="vertical">
    <Menu.Root :positioning="{ placement: 'right-start' }">
      <Menu.Trigger :class="styles.Trigger">Account</Menu.Trigger>
      <Teleport to="body">
        <Menu.Positioner>
          <Menu.Content :class="menu.Content">
            <Menu.Item :class="menu.Item" value="profile">Profile</Menu.Item>
            <Menu.Item :class="menu.Item" value="billing">Billing</Menu.Item>
          </Menu.Content>
        </Menu.Positioner>
      </Teleport>
    </Menu.Root>

    <Menu.Root :positioning="{ placement: 'right-start' }">
      <Menu.Trigger :class="styles.Trigger">Workspace</Menu.Trigger>
      <Teleport to="body">
        <Menu.Positioner>
          <Menu.Content :class="menu.Content">
            <Menu.Item :class="menu.Item" value="members">Members</Menu.Item>
            <Menu.Item :class="menu.Item" value="integrations">Integrations</Menu.Item>
          </Menu.Content>
        </Menu.Positioner>
      </Teleport>
    </Menu.Root>

    <Menu.Root :positioning="{ placement: 'right-start' }">
      <Menu.Trigger :class="styles.Trigger">Help</Menu.Trigger>
      <Teleport to="body">
        <Menu.Positioner>
          <Menu.Content :class="menu.Content">
            <Menu.Item :class="menu.Item" value="docs">Documentation</Menu.Item>
            <Menu.Item :class="menu.Item" value="support">Contact Support</Menu.Item>
          </Menu.Content>
        </Menu.Positioner>
      </Teleport>
    </Menu.Root>
  </Menubar.Root>
</template>
