<script setup lang="ts">
import { Dialog } from '@ark-ui/vue/dialog'
import { XIcon } from 'lucide-vue-next'
import { ref } from 'vue'

const finalRef = ref<HTMLButtonElement>()
</script>

<template>
  <button type="button" ref="finalRef">I will receive focus when dialog closes</button>
  <Dialog.Root :final-focus-el="() => finalRef">
    <Dialog.Trigger>Open Dialog</Dialog.Trigger>
    <Teleport to="body">
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content>
          <Dialog.Title>Dialog Title</Dialog.Title>
          <Dialog.Description>
            When this dialog closes, focus will return to the button above instead of the trigger.
          </Dialog.Description>
          <Dialog.CloseTrigger>
            <XIcon />
          </Dialog.CloseTrigger>
        </Dialog.Content>
      </Dialog.Positioner>
    </Teleport>
  </Dialog.Root>
</template>
