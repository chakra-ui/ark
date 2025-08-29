<script setup lang="ts">
import { Toast, Toaster, createToaster } from '@ark-ui/vue/toast'
import { CircleAlertIcon, TriangleAlertIcon, CircleCheckIcon, InfoIcon, X } from 'lucide-vue-next'

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
        @click="toaster.success({ title: 'Success!', description: 'Your changes have been saved.' })"
      >
        Success
      </button>
      <button
        type="button"
        @click="toaster.error({ title: 'Error occurred', description: 'Something went wrong. Please try again.' })"
      >
        Error
      </button>
      <button
        type="button"
        @click="toaster.warning({ title: 'Warning', description: 'This action cannot be undone.' })"
      >
        Warning
      </button>
      <button
        type="button"
        @click="
          toaster.info({ title: 'New update available', description: 'Version 2.1.0 is now available for download.' })
        "
      >
        Info
      </button>
    </div>

    <Toaster :toaster="toaster" v-slot="toast">
      <Toast.Root>
        <div style="display: flex; align-items: flex-start; gap: 12px">
          <component :is="toast.type ? iconMap[toast.type as keyof typeof iconMap] : InfoIcon" />
          <div style="flex: 1">
            <Toast.Title>{{ toast.title }}</Toast.Title>
            <Toast.Description>{{ toast.description }}</Toast.Description>
          </div>
          <Toast.CloseTrigger>
            <X />
          </Toast.CloseTrigger>
        </div>
      </Toast.Root>
    </Toaster>
  </div>
</template>
