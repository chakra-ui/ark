<script setup lang="ts">
import { useAvatarContext } from './use-avatar-context'

export interface AvatarImageProps {
  foo?: string
}

defineProps<AvatarImageProps>()

const api = useAvatarContext()
</script>

<template>
 <img v-bind="api.imageProps" />
</template>