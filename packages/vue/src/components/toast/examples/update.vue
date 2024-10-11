<script setup lang="ts">
import { Toast, Toaster, createToaster } from '@ark-ui/vue/toast'
import { ref } from 'vue'

const toaster = createToaster({
  placement: 'bottom-end',
  overlap: true,
  gap: 24,
})

const id = ref<string | undefined>(undefined)

const createToast = () => {
  id.value = toaster.create({
    title: 'Loading',
    description: 'Loading ...',
    type: 'info',
  })
}

const updateToast = () => {
  if (!id.value) {
    return
  }
  toaster.update(id.value, {
    title: 'Success',
    description: 'Success!',
  })
}
</script>

<template>
  <div>
    <button type="button" @click="createToast">Create Toast</button>
    <button type="button" @click="updateToast">Update Toast</button>
    <Toaster :toaster="toaster" v-slot="toast">
      <Toast.Root>
        <Toast.Title>{{ toast.title }}</Toast.Title>
        <Toast.Description>{{ toast.description }}</Toast.Description>
      </Toast.Root>
    </Toaster>
  </div>
</template>
