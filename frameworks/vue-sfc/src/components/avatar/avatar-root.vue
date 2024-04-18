<script setup lang="ts">
import type { StatusChangeDetails } from '@zag-js/avatar'
import { type UseAvatarProps, useAvatar } from './use-avatar'
import { AvatarProvider } from './use-avatar-context'

export type AvatarRootEmits = {
  statusChange: [details: StatusChangeDetails]
}
export interface AvatarRootProps extends Omit<UseAvatarProps, 'onStatusChange'> {}

const props = defineProps<AvatarRootProps>()
const emits = defineEmits<AvatarRootEmits>()
defineSlots<{
  default(): any
}>()

const avatar = useAvatar(props, emits)
AvatarProvider(avatar)
</script>

<template>
  <div v-bind="avatar.rootProps">
    <slot />
  </div>
</template>