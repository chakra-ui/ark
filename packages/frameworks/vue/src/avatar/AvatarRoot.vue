<script lang="ts">
import { type AvatarProps } from './avatar.props'
import { type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
export interface AvatarRootProps
  extends /* @vue-ignore */ Assign<HTMLArkProps<'div'>, AvatarProps> {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { AvatarProvider } from './avatar-context'
import { type AvatarEmits } from './avatar.props'
import { useAvatar } from './use-avatar'

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
