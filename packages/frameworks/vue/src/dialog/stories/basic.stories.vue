<script setup lang="ts">
import { Teleport } from 'vue'
import {
  Dialog,
  DialogBackdrop,
  DialogCloseTrigger,
  DialogPositioner,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '../'
</script>
<template>
  <Dialog>
    <DialogTrigger>
      <button>click me</button>
    </DialogTrigger>
    <Teleport to="body">
      <DialogBackdrop />
      <DialogPositioner>
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
      </DialogPositioner>
    </Teleport>
  </Dialog>
</template>
