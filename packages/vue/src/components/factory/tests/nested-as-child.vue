<script setup lang="ts">
import { ark } from '@ark-ui/vue/factory'
</script>

<template>
  <ark.div id="parent" data-part="parent" data-testid="parent" class="parent" :style="{ background: 'red' }" as-child>
    <ark.span id="child" data-part="child" data-testid="child" class="child" :style="{ color: 'blue' }">
      Ark UI
    </ark.span>
  </ark.div>
</template>
