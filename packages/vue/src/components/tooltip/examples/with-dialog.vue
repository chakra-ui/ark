<script setup lang="ts">
import { Dialog } from '@ark-ui/vue/dialog'
import { Tooltip } from '@ark-ui/vue/tooltip'
import { XIcon } from 'lucide-vue-next'
import button from 'styles/button.module.css'
import styles from 'styles/dialog.module.css'
import tooltipStyles from 'styles/tooltip.module.css'
</script>

<template>
  <Dialog.Root>
    <Tooltip.Root>
      <Tooltip.Trigger #render="ctx">
        <Dialog.Trigger v-bind="ctx.props" :class="button.Root">Open Dialog</Dialog.Trigger>
      </Tooltip.Trigger>
      <Teleport to="body">
        <Tooltip.Positioner>
          <Tooltip.Content :class="tooltipStyles.Content">Opens a sign-in dialog</Tooltip.Content>
        </Tooltip.Positioner>
      </Teleport>
    </Tooltip.Root>
    <Teleport to="body">
      <Dialog.Backdrop :class="styles.Backdrop" />
      <Dialog.Positioner :class="styles.Positioner">
        <Dialog.Content :class="styles.Content">
          <Dialog.CloseTrigger :class="styles.CloseTrigger">
            <XIcon />
          </Dialog.CloseTrigger>
          <Dialog.Title :class="styles.Title">Welcome Back</Dialog.Title>
          <Dialog.Description :class="styles.Description">Sign in to your account to continue.</Dialog.Description>
        </Dialog.Content>
      </Dialog.Positioner>
    </Teleport>
  </Dialog.Root>
</template>
