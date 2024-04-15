<script setup lang="tsx">
import { Toast, createToaster } from '../'
import './toast.css'

const toaster = createToaster({ placement: 'bottom-end' })
const createToast = () =>
  toaster.create({
    title: 'Toast Title',
    description: 'Toast Description',
    type: 'info',
  })
</script>

<template>
  <Story title="Toast">
    <Variant title="Basic">
      <button @click="createToast">Toast</button>
     <Toaster v-slot="toast">
      <Toast.Root :toast="toast">
        <Toast.Title>{{ toast.title }}</Toast.Title>
        <Toast.Description>{{ toast.description }}</Toast.Description>
        <Toast.CloseTrigger>Close</Toast.CloseTrigger>
      </Toast.Root>
     </Toaster>
    </Variant>

 
  </Story>
</template>
