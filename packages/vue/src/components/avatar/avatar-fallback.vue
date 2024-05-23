<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface AvatarFallbackProps extends PolymorphicProps, /* @vue-ignore */ HTMLAttributes {}
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
