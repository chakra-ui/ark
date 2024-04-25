<script lang="ts">
import type { RootEmits, RootProps } from './avatar.types'

export interface AvatarRootProps extends RootProps, PolymorphicProps {}
export interface AvatarRootEmits extends RootEmits {}
</script>

<script setup lang="ts">
import { ark, type PolymorphicProps } from '../factory'
import { useAvatar } from './use-avatar'
import { AvatarProvider } from './use-avatar-context'

const props = defineProps<AvatarRootProps>()
const emits = defineEmits<AvatarRootEmits>()

const avatar = useAvatar(props, emits)
AvatarProvider(avatar)
</script>

<template>
  <ark.div v-bind="avatar.rootProps" :as-child="asChild">
    <slot />
  </ark.div>
</template>
