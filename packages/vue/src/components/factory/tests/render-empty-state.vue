<script setup lang="ts">
import { ark } from '@ark-ui/vue/factory'

const props = defineProps<{
  onState: (state: unknown) => void
}>()

const capture = (state: unknown) => {
  props.onState(state)
  return ''
}
</script>

<template>
  <ark.button #render="ctx">
    <button v-bind="ctx.props" data-testid="child">{{ capture(ctx.state) }}</button>
  </ark.button>
</template>
