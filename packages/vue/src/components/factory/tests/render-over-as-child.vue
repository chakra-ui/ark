<script setup lang="ts">
import { ark } from '@ark-ui/vue/factory'
</script>

<template>
  <ark.button as-child>
    <template #render="ctx">
      <button v-bind="ctx.props" data-testid="child">render</button>
    </template>
    <span data-testid="as-child">as child</span>
  </ark.button>
</template>
