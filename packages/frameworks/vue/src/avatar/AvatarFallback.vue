<script setup lang="ts">
import type { VNode } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { useAvatarContext } from './avatar-context'

defineSlots<{
  default?: VNode[]
}>()

defineProps<AvatarFallbackProps>()
const api = useAvatarContext()
</script>

<script lang="ts">
export interface AvatarFallbackProps extends /* @vue-ignore */ HTMLArkProps<'span'> {}
// have to add the vue-ignore when using the interface as props type.
</script>

<template>
  <ark.span v-bind="api.fallbackProps">
    <slot v-if="$slots.default" />
  </ark.span>
</template>
