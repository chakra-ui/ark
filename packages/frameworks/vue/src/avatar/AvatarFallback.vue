<script setup lang="ts">
import { ark } from '../factory'
import { useAvatarContext } from './avatar-context'
import type { AvatarFallbackProps } from './avatar.props'

defineProps<AvatarFallbackProps>()
const slots = defineSlots<{
  default(): any
}>()

const api = useAvatarContext()
</script>

<template>
  <ark.span v-bind="api.fallbackProps">
    <slot v-if="slots.default()" />
  </ark.span>
</template>
