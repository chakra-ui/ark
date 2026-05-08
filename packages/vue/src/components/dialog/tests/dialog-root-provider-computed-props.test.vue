<script setup lang="ts">
import { computed } from 'vue'
import { Dialog, useDialog } from '../..'

const dialog = useDialog(
  computed(() => ({
    id: 'test-id',
  })),
)
</script>

<template>
  <button @click="dialog.setOpen(true)">Open Dialog</button>

  <Dialog.RootProvider :value="dialog">
    <Teleport to="body">
      <Dialog.Positioner>
        <Dialog.Content>
          <Dialog.Title>Dialog Title</Dialog.Title>
          <Dialog.CloseTrigger>Close</Dialog.CloseTrigger>
        </Dialog.Content>
      </Dialog.Positioner>
    </Teleport>
  </Dialog.RootProvider>
</template>
