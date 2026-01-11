<script setup lang="ts">
import { Dialog } from '@ark-ui/vue/dialog'
import { Menu } from '@ark-ui/vue/menu'
import { ChevronDownIcon, XIcon } from 'lucide-vue-next'
import { ref, Teleport } from 'vue'
import button from 'styles/button.module.css'
import dialog from 'styles/dialog.module.css'
import styles from 'styles/menu.module.css'

const dialogOpen = ref(false)
</script>

<template>
  <Menu.Root>
    <Menu.Trigger :class="styles.Trigger">
      Actions
      <Menu.Indicator :class="styles.Indicator">
        <ChevronDownIcon />
      </Menu.Indicator>
    </Menu.Trigger>
    <Teleport to="body">
      <Menu.Positioner>
        <Menu.Content :class="styles.Content">
          <Menu.Item :class="styles.Item" value="edit">Edit</Menu.Item>
          <Menu.Item :class="styles.Item" value="duplicate">Duplicate</Menu.Item>
          <Menu.Separator :class="styles.Separator" />
          <Menu.Item :class="styles.Item" value="delete" @click="dialogOpen = true">Delete...</Menu.Item>
        </Menu.Content>
      </Menu.Positioner>
    </Teleport>
  </Menu.Root>

  <Dialog.Root v-model:open="dialogOpen" role="alertdialog">
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
          <div :class="dialog.Actions">
            <button :class="button.Root" @click="dialogOpen = false">Cancel</button>
            <button :class="button.Root" data-variant="solid" @click="dialogOpen = false">Delete</button>
          </div>
        </Dialog.Content>
      </Dialog.Positioner>
    </Teleport>
  </Dialog.Root>
</template>
