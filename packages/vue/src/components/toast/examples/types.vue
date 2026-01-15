<script setup lang="ts">
import { Toast, Toaster, createToaster } from '@ark-ui/vue/toast'
import { CircleAlertIcon, TriangleAlertIcon, CircleCheckIcon, InfoIcon, X } from 'lucide-vue-next'
import button from 'styles/button.module.css'
import styles from 'styles/toast.module.css'

const toaster = createToaster({
  overlap: true,
  placement: 'bottom-end',
  gap: 16,
})

const iconMap = {
  success: CircleCheckIcon,
  error: CircleAlertIcon,
  warning: TriangleAlertIcon,
  info: InfoIcon,
}
</script>

<template>
  <div>
    <div style="display: flex; gap: 12px; flex-wrap: wrap">
      <button
        type="button"
        :class="button.Root"
        @click="toaster.success({ title: 'Changes saved', description: 'Your profile has been updated successfully.' })"
      >
        Success
      </button>
      <button
        type="button"
        :class="button.Root"
        @click="toaster.error({ title: 'Upload failed', description: 'There was an error uploading your file.' })"
      >
        Error
      </button>
      <button
        type="button"
        :class="button.Root"
        @click="toaster.warning({ title: 'Low storage', description: 'You have less than 10% storage remaining.' })"
      >
        Warning
      </button>
      <button
        type="button"
        :class="button.Root"
        @click="
          toaster.info({ title: 'Update available', description: 'A new version of the app is ready to install.' })
        "
      >
        Info
      </button>
    </div>

    <Teleport to="body">
      <Toaster :toaster="toaster" v-slot="toast">
        <Toast.Root :class="styles.Root">
          <Toast.Title :class="styles.Title">
            <component
              :is="toast.type ? iconMap[toast.type as keyof typeof iconMap] : InfoIcon"
              :class="styles.Indicator"
            />
            {{ toast.title }}
          </Toast.Title>
          <Toast.Description :class="styles.Description">{{ toast.description }}</Toast.Description>
          <Toast.CloseTrigger :class="styles.CloseTrigger">
            <X />
          </Toast.CloseTrigger>
        </Toast.Root>
      </Toaster>
    </Teleport>
  </div>
</template>
