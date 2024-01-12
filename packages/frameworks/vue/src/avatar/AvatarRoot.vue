<script lang="ts">
import { type UseAvatarProps } from './use-avatar'
import { type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
export interface AvatarProps extends Assign<HTMLArkProps<'div'>, UseAvatarProps> {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { AvatarProvider } from './avatar-context'
import { avatarProps, type AvatarEmits } from './avatar.props' // Name change was needed to not have double props
import { useAvatar } from './use-avatar'

const props = defineProps(avatarProps)
const emit = defineEmits<AvatarEmits>()

defineSlots<{
  default?: (props: any) => any
}>()

const api = useAvatar(props, emit)
AvatarProvider(api)
</script>

<template>
  <ark.div v-bind="api.rootProps">
    <slot v-if="$slots.default" />
  </ark.div>
</template>
