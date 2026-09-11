<script setup lang="ts">
import { Menu } from '@ark-ui/vue/menu'
import { Menubar } from '@ark-ui/vue/menubar'
import { Teleport } from 'vue'
import menu from 'styles/menu.module.css'
import styles from 'styles/menubar.module.css'
</script>

<template>
  <Menubar.Root :class="styles.Root">
    <Menu.Root>
      <Menu.Trigger :class="styles.Trigger">File</Menu.Trigger>
      <Teleport to="body">
        <Menu.Positioner>
          <Menu.Content :class="menu.Content">
            <Menu.Item :class="menu.Item" value="new">New File</Menu.Item>
            <Menu.Item :class="menu.Item" value="open">Open...</Menu.Item>
            <Menu.Separator :class="menu.Separator" />
            <Menu.Item :class="menu.Item" value="save">Save</Menu.Item>
            <Menu.Item :class="menu.Item" value="save-as">Save As...</Menu.Item>
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
            <Menu.Item :class="menu.Item" value="redo">Redo</Menu.Item>
            <Menu.Separator :class="menu.Separator" />
            <Menu.Item :class="menu.Item" value="cut">Cut</Menu.Item>
            <Menu.Item :class="menu.Item" value="copy">Copy</Menu.Item>
            <Menu.Item :class="menu.Item" value="paste">Paste</Menu.Item>
          </Menu.Content>
        </Menu.Positioner>
      </Teleport>
    </Menu.Root>

    <Menu.Root>
      <Menu.Trigger :class="styles.Trigger" disabled>Develop</Menu.Trigger>
      <Teleport to="body">
        <Menu.Positioner>
          <Menu.Content :class="menu.Content">
            <Menu.Item :class="menu.Item" value="inspect">Inspect Element</Menu.Item>
          </Menu.Content>
        </Menu.Positioner>
      </Teleport>
    </Menu.Root>

    <Menu.Root>
      <Menu.Trigger :class="styles.Trigger">View</Menu.Trigger>
      <Teleport to="body">
        <Menu.Positioner>
          <Menu.Content :class="menu.Content">
            <Menu.Item :class="menu.Item" value="zoom-in">Zoom In</Menu.Item>
            <Menu.Item :class="menu.Item" value="zoom-out">Zoom Out</Menu.Item>
            <Menu.Item :class="menu.Item" value="fullscreen">Toggle Fullscreen</Menu.Item>
          </Menu.Content>
        </Menu.Positioner>
      </Teleport>
    </Menu.Root>
  </Menubar.Root>
</template>
