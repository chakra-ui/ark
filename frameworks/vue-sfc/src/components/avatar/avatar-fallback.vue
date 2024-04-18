<script setup lang="ts">
import { useAvatarContext } from './use-avatar-context'

defineSlots<{
  default(): any
}>()

const avatar = useAvatarContext()
</script>

<template>
  <span v-bind="avatar.fallbackProps">
    <slot />
  </span>
</template>