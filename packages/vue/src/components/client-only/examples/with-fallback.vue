<script setup lang="ts">
import { ClientOnly } from '@ark-ui/vue/client-only'
</script>

<template>
  <ClientOnly>
    <template #fallback>
      <div>Loading...</div>
    </template>
    <div>This content is only rendered on the client side.</div>
  </ClientOnly>
</template>
