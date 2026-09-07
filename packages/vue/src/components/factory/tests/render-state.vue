<script setup lang="ts">
import { ark } from '@ark-ui/vue/factory'

defineProps<{
  open: boolean
}>()
</script>

<template>
  <ark.button :state="{ open }" #render="ctx">
    <button v-bind="ctx.props" data-testid="child">{{ ctx.state.open ? 'Open' : 'Closed' }}</button>
  </ark.button>
</template>
