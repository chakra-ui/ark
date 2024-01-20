<script setup lang="ts">
import { ark } from '../factory'
import { useAvatarContext } from './avatar-context'
import type { AvatarImageProps } from './avatar.props'

defineProps<AvatarImageProps>()

const api = useAvatarContext()
</script>

<template>
  <ark.img v-bind="api.imageProps" />
</template>
