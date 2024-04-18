<script setup lang="ts">
import type { UnwrapRef } from 'vue'
import { type UseAvatarContext, useAvatarContext } from './use-avatar-context'

const avatar = useAvatarContext()

defineSlots<{
  default(props: {
    avatar: UnwrapRef<UseAvatarContext>
  }): any
}>()
</script>

<template>
  <slot :avatar />
</template>