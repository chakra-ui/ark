<script setup lang="tsx">
import { h } from 'vue'
import { createToaster } from './'
import './toast.css'
import Toast from './toast.vue'

const [Toaster, toast] = createToaster({
  placement: 'top-start',
  render: () => h(Toast),
})

const createToast = () =>
  toast.value.create({
    title: 'Title',
    description: 'Description',
  })
</script>

<template>
  <Story title="Toast">
    <Variant title="Basic">
      <button @click="createToast">Create Toast</button>
      <Toaster />
    </Variant>
  </Story>
</template>
