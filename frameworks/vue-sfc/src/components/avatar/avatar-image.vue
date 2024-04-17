<script setup lang="ts">
import { useAvatarContext } from './use-avatar-context'

export interface AvatarImageProps {
  foo?: string
}

defineProps<AvatarImageProps>()
const avatar = useAvatarContext()
</script>

<template>
  <img v-bind="avatar.imageProps" />
</template>