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

const createToast = () => {
  toaster.create({
    title: 'Scheduled for tomorrow',
    description: 'Your meeting has been scheduled for tomorrow at 10am.',
    type: 'info',
  })
}
</script>

<template>
  <div>
    <button type="button" :class="button.Root" @click="createToast">Schedule meeting</button>
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
