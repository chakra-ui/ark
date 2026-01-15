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

const id = ref<string | undefined>(undefined)

const createToast = () => {
  id.value = toaster.create({
    title: 'Uploading file...',
    description: 'Please wait while your file is being uploaded.',
    type: 'loading',
  })
}

const updateToast = () => {
  if (!id.value) {
    return
  }
  toaster.update(id.value, {
    title: 'Upload complete',
    description: 'Your file has been uploaded successfully.',
    type: 'success',
  })
}
</script>

<template>
  <div>
    <div style="display: flex; gap: 8px">
      <button type="button" :class="button.Root" @click="createToast">Start upload</button>
      <button type="button" :class="button.Root" @click="updateToast">Complete upload</button>
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
