<script setup lang="ts">
import type { AvatarRootEmits, AvatarRootProps } from './avatar.types'
import { useAvatar } from './use-avatar'
import { AvatarProvider } from './use-avatar-context'

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