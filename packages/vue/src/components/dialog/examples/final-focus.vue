<script setup lang="ts">
import { Dialog } from '@ark-ui/vue/dialog'
import { XIcon } from 'lucide-vue-next'
import { ref } from 'vue'
import button from 'styles/button.module.css'
import styles from 'styles/dialog.module.css'

const buttonRef = ref<HTMLButtonElement | null>(null)
</script>

<template>
  <button ref="buttonRef" :class="button.Root">Focus Target</button>
  <Dialog.Root :final-focus-el="() => buttonRef">
    <Dialog.Trigger :class="button.Root">Open Dialog</Dialog.Trigger>
    <Teleport to="body">
      <Dialog.Backdrop :class="styles.Backdrop" />
      <Dialog.Positioner :class="styles.Positioner">
        <Dialog.Content :class="styles.Content">
          <Dialog.CloseTrigger :class="styles.CloseTrigger">
            <XIcon />
          </Dialog.CloseTrigger>
          <Dialog.Title :class="styles.Title">Custom Focus Return</Dialog.Title>
          <Dialog.Description :class="styles.Description">
            When this dialog closes, focus will return to the "Focus Target" button instead of the trigger.
          </Dialog.Description>
        </Dialog.Content>
      </Dialog.Positioner>
    </Teleport>
  </Dialog.Root>
</template>
