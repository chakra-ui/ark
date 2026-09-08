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
            <Menu.Root>
              <Menu.TriggerItem :class="menu.TriggerItem">Export</Menu.TriggerItem>
              <Teleport to="body">
                <Menu.Positioner>
                  <Menu.Content :class="menu.Content">
                    <Menu.Item :class="menu.Item" value="pdf">PDF</Menu.Item>
                    <Menu.Item :class="menu.Item" value="png">PNG</Menu.Item>
                    <Menu.Item :class="menu.Item" value="svg">SVG</Menu.Item>
                  </Menu.Content>
                </Menu.Positioner>
              </Teleport>
            </Menu.Root>
            <Menu.Separator :class="menu.Separator" />
            <Menu.Item :class="menu.Item" value="print">Print...</Menu.Item>
          </Menu.Content>
        </Menu.Positioner>
      </Teleport>
    </Menu.Root>

    <Menu.Root>
      <Menu.Trigger :class="styles.Trigger">Edit</Menu.Trigger>
      <Teleport to="body">
        <Menu.Positioner>
          <Menu.Content :class="menu.Content">
            <Menu.Item :class="menu.Item" value="cut">Cut</Menu.Item>
            <Menu.Item :class="menu.Item" value="copy">Copy</Menu.Item>
            <Menu.Item :class="menu.Item" value="paste">Paste</Menu.Item>
            <Menu.Separator :class="menu.Separator" />
            <Menu.Root>
              <Menu.TriggerItem :class="menu.TriggerItem">Find</Menu.TriggerItem>
              <Teleport to="body">
                <Menu.Positioner>
                  <Menu.Content :class="menu.Content">
                    <Menu.Item :class="menu.Item" value="find">Find...</Menu.Item>
                    <Menu.Item :class="menu.Item" value="find-next">Find Next</Menu.Item>
                    <Menu.Item :class="menu.Item" value="replace">Replace...</Menu.Item>
                  </Menu.Content>
                </Menu.Positioner>
              </Teleport>
            </Menu.Root>
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
          </Menu.Content>
        </Menu.Positioner>
      </Teleport>
    </Menu.Root>
  </Menubar.Root>
</template>
