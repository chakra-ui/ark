<script setup lang="ts">
import { Dialog } from '@ark-ui/vue/dialog'
import { Menu } from '@ark-ui/vue/menu'
import { ChevronDownIcon, XIcon } from 'lucide-vue-next'
import { Teleport } from 'vue'
import button from 'styles/button.module.css'
import dialog from 'styles/dialog.module.css'
import styles from 'styles/menu.module.css'
</script>

<template>
  <Dialog.Root>
    <Dialog.Trigger :class="button.Root">Open Dialog</Dialog.Trigger>
    <Teleport to="body">
      <Dialog.Backdrop :class="dialog.Backdrop" />
      <Dialog.Positioner :class="dialog.Positioner">
        <Dialog.Content :class="dialog.Content">
          <Dialog.Title :class="dialog.Title">Settings</Dialog.Title>
          <Dialog.Description :class="dialog.Description">Configure your preferences below.</Dialog.Description>
          <Dialog.CloseTrigger :class="dialog.CloseTrigger">
            <XIcon />
          </Dialog.CloseTrigger>
          <div :class="dialog.Body">
            <Menu.Root lazy-mount unmount-on-exit>
              <Menu.Trigger :class="styles.Trigger">
                Select theme
                <Menu.Indicator :class="styles.Indicator">
                  <ChevronDownIcon />
                </Menu.Indicator>
              </Menu.Trigger>
              <Teleport to="body">
                <Menu.Positioner>
                  <Menu.Content :class="styles.Content">
                    <Menu.Arrow :class="styles.Arrow">
                      <Menu.ArrowTip :class="styles.ArrowTip" />
                    </Menu.Arrow>
                    <Menu.Item :class="styles.Item" value="light">Light</Menu.Item>
                    <Menu.Item :class="styles.Item" value="dark">Dark</Menu.Item>
                    <Menu.Item :class="styles.Item" value="system">System</Menu.Item>
                  </Menu.Content>
                </Menu.Positioner>
              </Teleport>
            </Menu.Root>
          </div>
        </Dialog.Content>
      </Dialog.Positioner>
    </Teleport>
  </Dialog.Root>
</template>
