<script setup lang="ts">
import { Toast, Toaster, createToaster } from '@ark-ui/vue/toast'
import { XIcon, LoaderIcon, CircleCheckIcon, CircleAlertIcon } from 'lucide-vue-next'

const toaster = createToaster({
  overlap: true,
  placement: 'bottom-end',
  gap: 16,
})

const uploadFile = () => {
  return new Promise<void>((resolve, reject) => {
    setTimeout(() => {
      Math.random() > 0.5 ? resolve() : reject(new Error('Upload failed'))
    }, 2000)
  })
}

const handleUpload = async () => {
  toaster.promise(uploadFile, {
    loading: {
      title: 'Uploading...',
      description: 'Please wait while we process your request.',
    },
    success: {
      title: 'Success!',
      description: 'Your request has been processed successfully.',
    },
    error: {
      title: 'Failed',
      description: 'Something went wrong. Please try again.',
    },
  })
}

const iconMap = {
  loading: LoaderIcon,
  success: CircleCheckIcon,
  error: CircleAlertIcon,
}
</script>

<template>
  <div>
    <button type="button" @click="handleUpload">Start Process</button>

    <Toaster :toaster="toaster" v-slot="toast">
      <Toast.Root>
        <div style="display: flex; align-items: flex-start; gap: 12px">
          <component
            :is="toast.type ? iconMap[toast.type as keyof typeof iconMap] : undefined"
            :style="toast.type === 'loading' ? 'animation: spin 1s linear infinite;' : ''"
          />
          <div style="flex: 1">
            <Toast.Title>{{ toast.title }}</Toast.Title>
            <Toast.Description>{{ toast.description }}</Toast.Description>
          </div>
          <Toast.CloseTrigger>
            <XIcon />
          </Toast.CloseTrigger>
        </div>
      </Toast.Root>
    </Toaster>
  </div>
</template>
