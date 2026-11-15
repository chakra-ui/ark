<script setup lang="ts">
import { Toast, Toaster, createToaster } from '@ark-ui/vue/toast'

const toaster = createToaster({ placement: 'bottom', duration: Infinity })
</script>

<template>
  <button @click="toaster.create({ title: 'Custom root' })">Show toast</button>
  <Toaster :toaster="toaster" v-slot="toast">
    <Toast.Root as-child>
      <article data-testid="toast-host">
        <Toast.Title>{{ toast.title }}</Toast.Title>
      </article>
    </Toast.Root>
  </Toaster>
</template>
