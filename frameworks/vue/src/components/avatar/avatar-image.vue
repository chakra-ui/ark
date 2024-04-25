<script lang="ts">
import type { PolymorphicProps } from '../factory'

export interface AvatarImageProps extends PolymorphicProps {}
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
