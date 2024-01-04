<script setup lang="ts">
import type { VNode } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { useAvatarContext } from './avatar-context'

defineSlots<{
  default?: VNode[]
}>()

defineOptions({
  inheritAttrs: false,
})
// Im still a bit confused on this inheritAttrs, since it seems like my IDE still sees props from the Avatar Root component like dir etc.

const props = defineProps<AvatarFallbackProps>()
console.log('fallback props', props)
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
