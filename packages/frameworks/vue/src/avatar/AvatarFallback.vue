<script setup lang="ts">
import { ark } from '../factory'
import type { BaseProps } from '../types'
import { useAvatarContext } from './avatar-context'

export interface AvatarFallbackProps extends BaseProps {}

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
