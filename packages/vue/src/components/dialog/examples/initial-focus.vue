<script setup lang="ts">
import { Dialog } from '@ark-ui/vue/dialog'
import { XIcon } from 'lucide-vue-next'
import { ref } from 'vue'
import button from 'styles/button.module.css'
import styles from 'styles/dialog.module.css'

const inputRef = ref<HTMLInputElement | null>(null)
</script>

<template>
  <Dialog.Root :initial-focus-el="() => inputRef">
    <Dialog.Trigger :class="button.Root">Open Dialog</Dialog.Trigger>
    <Teleport to="body">
      <Dialog.Backdrop :class="styles.Backdrop" />
      <Dialog.Positioner :class="styles.Positioner">
        <Dialog.Content :class="styles.Content">
          <Dialog.CloseTrigger :class="styles.CloseTrigger">
            <XIcon />
          </Dialog.CloseTrigger>
          <Dialog.Title :class="styles.Title">Edit Profile</Dialog.Title>
          <Dialog.Description :class="styles.Description">
            The name input will be focused when this dialog opens.
          </Dialog.Description>
          <div :class="styles.Body">
            <input ref="inputRef" type="text" placeholder="Enter your name" />
            <input type="email" placeholder="Enter your email" />
          </div>
        </Dialog.Content>
      </Dialog.Positioner>
    </Teleport>
  </Dialog.Root>
</template>
