<script setup lang="ts">
import type { UnwrapRef } from 'vue'
import { type UseAvatarContext, useAvatarContext } from './use-avatar-context'

const avatar = useAvatarContext()

defineSlots<{
  default(props: {
    avatar: UnwrapRef<UseAvatarContext>
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  }): any
}>()
</script>

<template>
    <slot :avatar="avatar"></slot>
</template>