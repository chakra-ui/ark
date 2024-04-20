<script setup lang="tsx">
import {
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
    title: 'Toast Title',
    description: 'Toast Description',
    type: 'info',
  })
}
</script>

<template>
  <button @click="createToast">Toast</button>
  <Toaster :toaster="toaster" v-slot="toast">
    <ToastRoot>
      <ToastTitle>{{ toast.title }}</ToastTitle>
      <ToastDescription>{{ toast.description }}</ToastDescription>
      <ToastCloseTrigger>
        &#x2715;
      </ToastCloseTrigger>
    </ToastRoot>
  </Toaster>
</template>
