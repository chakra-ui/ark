<script setup lang="ts">
import { Dialog } from '@ark-ui/vue/dialog'
import { Menu } from '@ark-ui/vue/menu'
import { ChevronDownIcon, XIcon } from 'lucide-vue-next'
import { ref, Teleport } from 'vue'
import dialog from 'styles/dialog.module.css'
import menu from 'styles/menu.module.css'

const open = ref(false)
</script>

<template>
  <Menu.Root>
    <Menu.Trigger :class="menu.Trigger">
      Actions
      <Menu.Indicator :class="menu.Indicator">
        <ChevronDownIcon />
      </Menu.Indicator>
    </Menu.Trigger>
    <Teleport to="body">
      <Menu.Positioner>
        <Menu.Content :class="menu.Content">
          <Menu.Item :class="menu.Item" value="edit">Edit</Menu.Item>
          <Menu.Item :class="menu.Item" value="duplicate">Duplicate</Menu.Item>
          <Menu.Separator :class="menu.Separator" />
          <Menu.Item :class="menu.Item" value="delete" @click="open = true">Delete...</Menu.Item>
        </Menu.Content>
      </Menu.Positioner>
    </Teleport>
  </Menu.Root>

  <Dialog.Root v-model:open="open" role="alertdialog">
    <Teleport to="body">
      <Dialog.Backdrop :class="dialog.Backdrop" />
      <Dialog.Positioner :class="dialog.Positioner">
        <Dialog.Content :class="dialog.Content">
          <Dialog.Title :class="dialog.Title">Confirm Delete</Dialog.Title>
          <Dialog.Description :class="dialog.Description">
            Are you sure you want to delete this item? This action cannot be undone.
          </Dialog.Description>
          <Dialog.CloseTrigger :class="dialog.CloseTrigger">
            <XIcon />
          </Dialog.CloseTrigger>
        </Dialog.Content>
      </Dialog.Positioner>
    </Teleport>
  </Dialog.Root>
</template>
