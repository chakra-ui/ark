<script lang="ts">
import type { PolimoprhicProps } from '../factory'

export interface AvatarFallbackProps extends PolimoprhicProps {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useAvatarContext } from './use-avatar-context'

defineProps<AvatarFallbackProps>()
const avatar = useAvatarContext()
</script>

<template>
  <ark.span v-bind="avatar.fallbackProps" :as-child="asChild">
    <slot />
  </ark.span>
</template>
