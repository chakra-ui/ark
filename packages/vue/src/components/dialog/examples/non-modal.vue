<script setup lang="ts">
import { Dialog } from '@ark-ui/vue/dialog'
import { XIcon } from 'lucide-vue-next'
</script>

<template>
  <Dialog.Root :modal="false">
    <Dialog.Trigger>Open Non-Modal Dialog</Dialog.Trigger>
    <Teleport to="body">
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content>
          <Dialog.Title>Non-Modal Dialog</Dialog.Title>
          <Dialog.Description>
            This dialog allows interaction with elements outside. You can click buttons, select text, and interact with
            the page behind it.
          </Dialog.Description>
          <Dialog.CloseTrigger>
            <XIcon />
          </Dialog.CloseTrigger>
        </Dialog.Content>
      </Dialog.Positioner>
    </Teleport>
  </Dialog.Root>
</template>
