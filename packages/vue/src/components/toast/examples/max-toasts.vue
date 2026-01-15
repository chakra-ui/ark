<script setup lang="ts">
import { Toast, Toaster, createToaster } from '@ark-ui/vue/toast'
import { X } from 'lucide-vue-next'
import button from 'styles/button.module.css'
import styles from 'styles/toast.module.css'

const toaster = createToaster({
  max: 3,
  overlap: true,
  placement: 'bottom-end',
  gap: 16,
})

const messages = [
  { title: 'Message received', description: 'You have a new message from Sarah.' },
  { title: 'File uploaded', description: 'Your document has been saved.' },
  { title: 'Sync complete', description: 'All changes have been synced.' },
  { title: 'New follower', description: 'John started following you.' },
  { title: 'Task completed', description: 'Your export is ready for download.' },
]

const addFiveToasts = () => {
  messages.forEach((msg) => {
    toaster.create({
      title: msg.title,
      description: msg.description,
      type: 'info',
    })
  })
}
</script>

<template>
  <div>
    <div style="display: flex; flex-wrap: wrap; gap: 8px">
      <button
        type="button"
        :class="button.Root"
        @click="
          toaster.create({
            title: 'New notification',
            description: 'Maximum of 3 toasts visible at once. Extra toasts are queued.',
            type: 'info',
          })
        "
      >
        Add toast
      </button>
      <button type="button" :class="button.Root" @click="addFiveToasts">Add 5 toasts</button>
    </div>

    <Teleport to="body">
      <Toaster :toaster="toaster" v-slot="toast">
        <Toast.Root :class="styles.Root">
          <Toast.Title :class="styles.Title">{{ toast.title }}</Toast.Title>
          <Toast.Description :class="styles.Description">{{ toast.description }}</Toast.Description>
          <Toast.CloseTrigger :class="styles.CloseTrigger">
            <X />
          </Toast.CloseTrigger>
        </Toast.Root>
      </Toaster>
    </Teleport>
  </div>
</template>
