<script setup lang="ts">
import { ref } from 'vue'
import { Dialog } from '../..'

const open = ref(false)
</script>

<template>
  <button @click="() => (open = true)">Open Dialog</button>
  <Dialog.Root v-model:open="open">
    <Teleport to="body">
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content>
          <Dialog.Title>Dialog Title</Dialog.Title>
          <Dialog.Description>Dialog Description</Dialog.Description>
          <Dialog.CloseTrigger>Close</Dialog.CloseTrigger>
        </Dialog.Content>
      </Dialog.Positioner>
    </Teleport>
  </Dialog.Root>
</template>
