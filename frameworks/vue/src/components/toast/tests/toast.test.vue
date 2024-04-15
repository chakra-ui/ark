<script setup lang="tsx">
import { Toast, createToaster } from '../'

const toaster = createToaster({
  placement: 'top-end',
})

const createToast = () =>
  toaster.create({
    title: 'Title',
    description: 'Description',
    type: 'info',
  })
</script>

<template>
  <div>
    <button @click="createToast">Create Toast</button>
    <Toaster v-slot="toast">
      <Toast.Root :toast="toast">
        <Toast.Title>{{ toast.title }}</Toast.Title>
        <Toast.Description>{{ toast.description }}</Toast.Description>
        <Toast.ActionTrigger>Start</Toast.ActionTrigger>
        <Toast.CloseTrigger>Close</Toast.CloseTrigger>
      </Toast.Root>
    </Toaster>
  </div>
</template>
