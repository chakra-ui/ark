<script setup lang="ts">
import { ark } from '../factory'
import type { BaseProps } from '../types'
import { AvatarProvider } from './avatar-context'
import type { AvatarEmits } from './avatar.emits'
import { useAvatar, type UseAvatarProps } from './use-avatar'

export interface AvatarRootProps extends BaseProps, UseAvatarProps {}

const props = defineProps<AvatarRootProps>()
const emit = defineEmits<AvatarEmits>()

const slots = defineSlots<{
  default(): any
}>()

const api = useAvatar(props, emit)
AvatarProvider(api)
</script>

<template>
  <ark.div v-bind="api.rootProps">
    <slot v-if="slots.default()" />
  </ark.div>
</template>
