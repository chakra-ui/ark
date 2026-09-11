<script setup lang="ts">
import { Menu } from '@ark-ui/vue/menu'
import { Menubar, type MenubarRootProps } from '@ark-ui/vue/menubar'
import { Teleport } from 'vue'

// absent booleans must stay `undefined`, otherwise Vue casts them to `false`
withDefaults(defineProps<MenubarRootProps>(), {
  disabled: undefined,
  loopFocus: undefined,
})
</script>

<template>
  <Menubar.Root v-bind="$props">
    <Menu.Root>
      <Menu.Trigger>File</Menu.Trigger>
      <Teleport to="body">
        <Menu.Positioner>
          <Menu.Content>
            <Menu.Item value="new">New File</Menu.Item>
            <Menu.Item value="open">Open</Menu.Item>
          </Menu.Content>
        </Menu.Positioner>
      </Teleport>
    </Menu.Root>

    <Menu.Root>
      <Menu.Trigger>Edit</Menu.Trigger>
      <Teleport to="body">
        <Menu.Positioner>
          <Menu.Content>
            <Menu.Item value="undo">Undo</Menu.Item>
            <Menu.Item value="redo">Redo</Menu.Item>
          </Menu.Content>
        </Menu.Positioner>
      </Teleport>
    </Menu.Root>

    <Menu.Root>
      <Menu.Trigger disabled>Develop</Menu.Trigger>
      <Teleport to="body">
        <Menu.Positioner>
          <Menu.Content>
            <Menu.Item value="inspect">Inspect</Menu.Item>
          </Menu.Content>
        </Menu.Positioner>
      </Teleport>
    </Menu.Root>

    <Menu.Root>
      <Menu.Trigger>View</Menu.Trigger>
      <Teleport to="body">
        <Menu.Positioner>
          <Menu.Content>
            <Menu.Item value="zoom-in">Zoom In</Menu.Item>
          </Menu.Content>
        </Menu.Positioner>
      </Teleport>
    </Menu.Root>
  </Menubar.Root>
</template>
