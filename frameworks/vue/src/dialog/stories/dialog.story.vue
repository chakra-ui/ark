<script setup lang="ts">
import { Teleport, ref } from 'vue'
import { Dialog } from '../'
import './dialog.css'

const open = ref(false)
</script>

<template>
  <Story title="Dialog">
    <Variant title="Basic">
      <Dialog.Root>
        <Dialog.Trigger>Open Dialog</Dialog.Trigger>
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
    </Variant>

    <Variant title="Controlled">
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
    </Variant>

    <Variant title="LazyMount">
      <Dialog.Root
        lazyMount
        unmountOnExit
        @exit-complete="() => console.log('onExitComplete invoked')"
      >
        <Dialog.Trigger>Open Dialog</Dialog.Trigger>
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
    </Variant>

    <Variant title="RenderFn">
      <Dialog.Root v-slot="api">
        <Dialog.Trigger>Open Dialog</Dialog.Trigger>
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
        <p>Dialog is {{ api.isOpen ? 'open' : 'closed' }}</p>
      </Dialog.Root>
    </Variant>
  </Story>
</template>
