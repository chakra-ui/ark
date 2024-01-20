<script setup lang="ts">
import { ark } from '../factory'
import { AvatarProvider } from './avatar-context'
import type { AvatarEmits, AvatarRootProps } from './avatar.props'
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
