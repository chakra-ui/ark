<script setup lang="ts">
import { Teleport } from 'vue'
import {
  Dialog,
  DialogBackdrop,
  DialogCloseTrigger,
  DialogContainer,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
  type DialogContext,
} from '../'
</script>
<template>
  <Dialog v-slot="{ isOpen }: DialogContext">
    <DialogTrigger>
      <button>click me</button>
    </DialogTrigger>
    <Teleport to="body">
      <DialogBackdrop />
      <DialogContainer>
        <DialogContent>
          <DialogTitle>Dialog Title</DialogTitle>
          <DialogDescription>Dialog Description</DialogDescription>
          <div>
            <input placeholder="Enter name..." />
            <button>Save</button>
          </div>
          <DialogCloseTrigger>
            <button>close</button>
          </DialogCloseTrigger>
        </DialogContent>
      </DialogContainer>
    </Teleport>
    <p>Dialog is {{ isOpen ? 'open' : 'close' }}</p>
  </Dialog>
</template>
