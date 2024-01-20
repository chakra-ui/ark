<script setup lang="ts">
import { ark } from '../factory'
import type { BaseProps } from '../types'
import { useAvatarContext } from './avatar-context'

export interface AvatarImageProps extends BaseProps {}

defineProps<AvatarImageProps>()

const api = useAvatarContext()
</script>

<template>
  <ark.img v-bind="api.imageProps" />
</template>
