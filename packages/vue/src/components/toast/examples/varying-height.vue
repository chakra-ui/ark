<script setup lang="ts">
import { Toast, Toaster, createToaster } from '@ark-ui/vue/toast'
import { X } from 'lucide-vue-next'
import { ref } from 'vue'
import button from 'styles/button.module.css'
import styles from 'styles/toast.module.css'

const toaster = createToaster({
  placement: 'bottom-end',
  overlap: true,
  gap: 16,
})

const DESCRIPTIONS = [
  'Your changes have been saved.',
  'File uploaded successfully. You can view it in your documents folder.',
  'Your meeting has been scheduled for tomorrow at 10:00 AM. We have sent a calendar invite to all participants.',
  'We noticed unusual activity on your account. For your security, please verify your identity by clicking the link sent to your email address.',
]

const count = ref(0)

const createToast = () => {
  count.value++
  const description = DESCRIPTIONS[Math.floor(Math.random() * DESCRIPTIONS.length)]
  toaster.create({
    title: `Notification ${count.value}`,
    description,
    type: 'info',
  })
}
</script>

<template>
  <div>
    <button type="button" :class="button.Root" @click="createToast">Create toast</button>
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
