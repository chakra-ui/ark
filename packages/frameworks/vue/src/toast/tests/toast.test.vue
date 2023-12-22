<script setup lang="tsx">
import { Toast, createToaster } from '../'

const [Toaster, toast] = createToaster({
  placement: 'top-end',
  render(toast) {
    return (
      <Toast.Root>
        <Toast.Title>{toast.title}</Toast.Title>
        <Toast.Description>{toast.description}</Toast.Description>
        <Toast.CloseTrigger>Close</Toast.CloseTrigger>
      </Toast.Root>
    )
  },
})
const createToast = () => toast.value.create({ title: 'Title', description: 'Description' })
</script>

<template>
  <div>
    <button @click="createToast">Create Toast</button>
    <Toaster />
  </div>
</template>
