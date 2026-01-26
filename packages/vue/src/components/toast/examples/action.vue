<script setup lang="ts">
import { Toast, Toaster, createToaster } from '@ark-ui/vue/toast'
import { X } from 'lucide-vue-next'
import button from 'styles/button.module.css'
import styles from 'styles/toast.module.css'

const toaster = createToaster({
  placement: 'bottom-end',
  overlap: true,
  gap: 16,
})

const addToast = () => {
  toaster.create({
    title: 'Invitation sent',
    description: 'Your team invitation has been sent. Click undo to cancel.',
    type: 'info',
    action: {
      label: 'Undo',
      onClick: () => {
        console.log('Undo clicked')
      },
    },
  })
}
</script>

<template>
  <div>
    <button type="button" :class="button.Root" @click="addToast">Send invitation</button>
    <Teleport to="body">
      <Toaster :toaster="toaster" v-slot="toast">
        <Toast.Root :class="styles.Root">
          <Toast.Title :class="styles.Title">{{ toast.title }}</Toast.Title>
          <Toast.Description :class="styles.Description">{{ toast.description }}</Toast.Description>
          <Toast.ActionTrigger v-if="toast.action" :class="styles.ActionTrigger">
            {{ toast.action?.label }}
          </Toast.ActionTrigger>
          <Toast.CloseTrigger :class="styles.CloseTrigger">
            <X />
          </Toast.CloseTrigger>
        </Toast.Root>
      </Toaster>
    </Teleport>
  </div>
</template>
