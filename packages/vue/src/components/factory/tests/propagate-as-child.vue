<script setup lang="ts">
import { ark } from '@ark-ui/vue/factory'
</script>

<template>
  <ark.div data-testid="parent" as-child>
    <ark.span as-child>
      <ark.span>Ark UI</ark.span>
    </ark.span>
  </ark.div>
</template>
