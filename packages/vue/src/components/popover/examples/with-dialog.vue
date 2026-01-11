<script setup lang="ts">
import { Dialog } from '@ark-ui/vue/dialog'
import { Popover } from '@ark-ui/vue/popover'
import { XIcon } from 'lucide-vue-next'
import { Teleport } from 'vue'
import button from 'styles/button.module.css'
import dialog from 'styles/dialog.module.css'
import styles from 'styles/popover.module.css'
</script>

<template>
  <Dialog.Root>
    <Dialog.Trigger :class="button.Root">Open Dialog</Dialog.Trigger>
    <Teleport to="body">
      <Dialog.Backdrop :class="dialog.Backdrop" />
      <Dialog.Positioner :class="dialog.Positioner">
        <Dialog.Content :class="dialog.Content">
          <Dialog.CloseTrigger :class="dialog.CloseTrigger">
            <XIcon />
          </Dialog.CloseTrigger>
          <Dialog.Title :class="dialog.Title">Edit Profile</Dialog.Title>
          <Dialog.Description :class="dialog.Description">Update your profile information below.</Dialog.Description>
          <div :class="dialog.Body">
            <Popover.Root lazyMount unmountOnExit>
              <Popover.Trigger :class="button.Root">More Options</Popover.Trigger>
              <Teleport to="body">
                <Popover.Positioner :class="styles.Positioner">
                  <Popover.Content :class="styles.Content">
                    <Popover.Arrow :class="styles.Arrow">
                      <Popover.ArrowTip :class="styles.ArrowTip" />
                    </Popover.Arrow>
                    <Popover.CloseTrigger :class="styles.CloseTrigger">
                      <XIcon />
                    </Popover.CloseTrigger>
                    <Popover.Title :class="styles.Title">Additional Settings</Popover.Title>
                    <Popover.Description :class="styles.Description">
                      This popover renders correctly above the dialog.
                    </Popover.Description>
                  </Popover.Content>
                </Popover.Positioner>
              </Teleport>
            </Popover.Root>
          </div>
        </Dialog.Content>
      </Dialog.Positioner>
    </Teleport>
  </Dialog.Root>
</template>
