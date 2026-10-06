<script setup lang="ts">
import { Toast, Toaster, createToaster } from '@ark-ui/vue/toast'

const toaster = createToaster({ placement: 'bottom', duration: Infinity })
</script>

<template>
  <button @click="toaster.create({ title: 'Native group' })">Show toast</button>
  <Toaster :toaster="toaster" v-slot="toast">
    <Toast.Root data-testid="toast-root">
      <Toast.Title>{{ toast.title }}</Toast.Title>
    </Toast.Root>
  </Toaster>
</template>
