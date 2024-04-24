<script lang="ts">
import type { SlotsType, UnwrapRef } from 'vue'
import type { UseAvatarContext } from './use-avatar-context'

export interface AvatarContextProps
  extends SlotsType<{
    default: UnwrapRef<UseAvatarContext>
  }> {}
</script>

<script setup lang="ts">
import { useAvatarContext } from './use-avatar-context'

const avatar = useAvatarContext()

defineSlots<{
  default(props: { avatar: UnwrapRef<UseAvatarContext> }): unknown
}>()
</script>

<template>
  <slot :avatar />
</template>
