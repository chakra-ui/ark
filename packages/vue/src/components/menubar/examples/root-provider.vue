<script setup lang="ts">
import { Menu } from '@ark-ui/vue/menu'
import { Menubar, useMenubar } from '@ark-ui/vue/menubar'
import { Teleport } from 'vue'
import menu from 'styles/menu.module.css'
import styles from 'styles/menubar.module.css'

const menubar = useMenubar()
</script>

<template>
  <div class="stack">
    <output>hasOpenMenu: {{ menubar.hasOpenMenu }}</output>
    <Menubar.RootProvider :class="styles.Root" :value="menubar">
      <Menu.Root>
        <Menu.Trigger :class="styles.Trigger">File</Menu.Trigger>
        <Teleport to="body">
          <Menu.Positioner :class="menu.Positioner">
            <Menu.Content :class="menu.Content">
              <Menu.List :class="menu.List">
                <Menu.Item :class="menu.Item" value="new">New File</Menu.Item>
                <Menu.Item :class="menu.Item" value="open">Open...</Menu.Item>
              </Menu.List>
            </Menu.Content>
          </Menu.Positioner>
        </Teleport>
      </Menu.Root>

      <Menu.Root>
        <Menu.Trigger :class="styles.Trigger">Edit</Menu.Trigger>
        <Teleport to="body">
          <Menu.Positioner :class="menu.Positioner">
            <Menu.Content :class="menu.Content">
              <Menu.List :class="menu.List">
                <Menu.Item :class="menu.Item" value="undo">Undo</Menu.Item>
                <Menu.Item :class="menu.Item" value="redo">Redo</Menu.Item>
              </Menu.List>
            </Menu.Content>
          </Menu.Positioner>
        </Teleport>
      </Menu.Root>
    </Menubar.RootProvider>
  </div>
</template>
