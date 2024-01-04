<script setup lang="ts">
import { ark, type HTMLArkProps } from '../factory'
import { useAvatarContext } from './avatar-context'

defineProps<AvatarImageProps>()

const api = useAvatarContext()
</script>

<script lang="ts">
export interface AvatarImageProps extends /* @vue-ignore */ HTMLArkProps<'img'> {}
</script>

<template>
  <ark.img v-bind="api.imageProps" />
</template>
