<script setup lang="ts">
import type { StatusChangeDetails } from '@zag-js/avatar'
import type { Direction } from '@zag-js/types'
import { useAvatar } from './use-avatar'
import { AvatarProvider } from './use-avatar-context'

export type AvatarRootEmits = {
  statusChange: [details: StatusChangeDetails]
}

export interface AvatarRootProps {
  id?: string
  dir?: Direction
}

const props = defineProps<AvatarRootProps>()
const emits = defineEmits<AvatarRootEmits>()

const avatar = useAvatar(props, emits)

AvatarProvider(avatar)
</script>

<template>
  <div v-bind="avatar.rootProps">
    <slot />
  </div>
</template>