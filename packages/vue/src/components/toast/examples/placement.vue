<script setup lang="ts">
import { Toast, Toaster, createToaster } from '@ark-ui/vue/toast'
import { X } from 'lucide-vue-next'
import button from 'styles/button.module.css'
import styles from 'styles/toast.module.css'

const toaster = createToaster({
  placement: 'top-end',
  overlap: true,
  gap: 16,
})

const addToast = () => {
  toaster.create({
    title: 'Notification',
    description: 'This toast appears at the top-right corner.',
    type: 'info',
  })
}
</script>

<template>
  <div>
    <button type="button" :class="button.Root" @click="addToast">Show toast (top-end)</button>
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
