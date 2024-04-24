<script lang="ts">
import type { PolimoprhicProps } from '../factory'

export interface AvatarImageProps extends PolimoprhicProps {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useAvatarContext } from './use-avatar-context'

defineProps<AvatarImageProps>()
const avatar = useAvatarContext()
</script>

<template>
  <ark.img v-bind="avatar.imageProps" :as-child="asChild" />
</template>
