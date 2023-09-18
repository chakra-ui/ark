<script setup lang="ts">
import { Teleport, ref } from 'vue'
import {
  Dialog,
  DialogBackdrop,
  DialogCloseTrigger,
  DialogContainer,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '../'

const open = ref(false)

const handleOpen = () => {
  open.value = !open.value
}
</script>
<template>
  <div>Open: {{ open }}</div>
  <button @click="handleOpen">Toggle Dialog</button>
  <Dialog v-model:open="open">
    <Teleport to="body">
      <DialogBackdrop />
      <DialogContainer data-testid="dialog-container">
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
  </Dialog>
</template>
