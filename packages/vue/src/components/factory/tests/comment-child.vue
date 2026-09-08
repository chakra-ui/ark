<script setup lang="ts">
import { ark } from '@ark-ui/vue/factory'
</script>

<template>
  <ark.div class="parent" as-child>
    <span v-if="false" />
    <span data-testid="child" class="child">Ark UI</span>
  </ark.div>
</template>
