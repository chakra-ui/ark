<script setup lang="ts">
import type { VNode } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { AvatarProvider } from './avatar-context'
import { componentProps } from './avatar.props' // Name change was needed to not have double props
import { useAvatar, type UseAvatarProps } from './use-avatar'

const props = defineProps(componentProps)

const emit = defineEmits<{
  'loading-status-change': []
}>() // I'm not sure why the emit `loading-status-change` needs to be kebab case here, otherwise I get a warning

defineSlots<{
  default?: (api: any) => VNode[]
}>()

const api = useAvatar(props, emit)
AvatarProvider(api)
</script>

<script lang="ts">
export interface AvatarProps extends Assign<HTMLArkProps<'div'>, UseAvatarProps> {}
</script>

<template>
  <ark.div v-bind="api.rootProps">
    <slot v-if="$slots.default" :api="api" />
  </ark.div>
</template>
