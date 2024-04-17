<script setup lang="ts">
import { useAvatarContext } from './use-avatar-context'

export interface AvatarFallbackProps {
  foo?: string
}

defineProps<AvatarFallbackProps>()

const api = useAvatarContext()
</script>

<template>
  <span v-bind="api.fallbackProps">
  <slot></slot>
  </span>
</template>