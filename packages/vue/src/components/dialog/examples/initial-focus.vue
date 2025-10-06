<script setup lang="ts">
import { Dialog } from '@ark-ui/vue/dialog'
import { XIcon } from 'lucide-vue-next'
import { ref } from 'vue'

const inputRef = ref<HTMLInputElement | null>(null)
</script>

<template>
  <Dialog.Root :initial-focus-el="() => inputRef">
    <Dialog.Trigger>Open Dialog</Dialog.Trigger>
    <Teleport to="body">
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content>
          <Dialog.Title>Edit Profile</Dialog.Title>
          <Dialog.Description>
            Make changes to your profile here. The first input will be focused when the dialog opens.
          </Dialog.Description>
          <input ref="inputRef" type="text" placeholder="Enter your name..." />
          <input type="email" placeholder="Enter your email..." />
          <Dialog.CloseTrigger>
            <XIcon />
          </Dialog.CloseTrigger>
        </Dialog.Content>
      </Dialog.Positioner>
    </Teleport>
  </Dialog.Root>
</template>
