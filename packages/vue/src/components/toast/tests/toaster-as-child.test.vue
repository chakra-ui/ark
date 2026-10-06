<script setup lang="ts">
import { Toaster, createToaster } from '@ark-ui/vue/toast'

const toaster = createToaster({ placement: 'bottom', duration: Infinity })
</script>

<template>
  <button @click="toaster.create({ title: 'Native group' })">Show toast</button>
  <Toaster :toaster="toaster" as-child>
    <section data-testid="group-host">Custom group</section>
  </Toaster>
</template>
