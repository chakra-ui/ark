<script setup lang="ts">
import { Menu } from '@ark-ui/vue/menu'
import { Menubar } from '@ark-ui/vue/menubar'
import { Teleport } from 'vue'
import menu from 'styles/menu.module.css'
import styles from 'styles/menubar.module.css'
</script>

<template>
  <Menubar.Root :class="styles.Root" disabled>
    <Menu.Root>
      <Menu.Trigger :class="styles.Trigger">File</Menu.Trigger>
      <Teleport to="body">
        <Menu.Positioner>
          <Menu.Content :class="menu.Content">
            <Menu.Item :class="menu.Item" value="new">New File</Menu.Item>
          </Menu.Content>
        </Menu.Positioner>
      </Teleport>
    </Menu.Root>

    <Menu.Root>
      <Menu.Trigger :class="styles.Trigger">Edit</Menu.Trigger>
      <Teleport to="body">
        <Menu.Positioner>
          <Menu.Content :class="menu.Content">
            <Menu.Item :class="menu.Item" value="undo">Undo</Menu.Item>
          </Menu.Content>
        </Menu.Positioner>
      </Teleport>
    </Menu.Root>
  </Menubar.Root>
</template>
