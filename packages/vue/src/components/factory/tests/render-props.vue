<script setup lang="ts">
import { ark } from '@ark-ui/vue/factory'

const emit = defineEmits<{
  click: []
}>()
</script>

<template>
  <ark.button data-part="trigger" @click="emit('click')" #render="ctx">
    <button v-bind="ctx.props" data-testid="child">Ark UI</button>
  </ark.button>
</template>
