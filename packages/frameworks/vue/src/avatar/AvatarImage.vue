<script lang="ts">
import { type HTMLArkProps } from '../factory'
export interface AvatarImageProps extends /* @vue-ignore */ HTMLArkProps<'img'> {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useAvatarContext } from './avatar-context'

defineProps<AvatarImageProps>()

const api = useAvatarContext()
</script>

<template>
  <ark.img v-bind="api.imageProps" />
</template>
