<script setup lang="tsx">
import {
  ToastActionTrigger,
  ToastCloseTrigger,
  ToastDescription,
  ToastRoot,
  ToastTitle,
  Toaster,
  createToaster,
} from '..'

const toaster = createToaster({ placement: 'bottom-end', overlap: true, gap: 24 })

const createToast = () => {
  toaster.create({
    title: 'Title',
    description: 'Description',
    type: 'info',
  })
}
</script>

<template>
  <button @click="createToast">Create Toast</button>
  <Toaster :toaster="toaster" v-slot="toast">
    <ToastRoot>
      <ToastTitle>{{ toast.title }}</ToastTitle>
      <ToastDescription>{{ toast.description }}</ToastDescription>
      <ToastActionTrigger>Action</ToastActionTrigger>
      <ToastCloseTrigger>Close</ToastCloseTrigger>
    </ToastRoot>
  </Toaster>
</template>
