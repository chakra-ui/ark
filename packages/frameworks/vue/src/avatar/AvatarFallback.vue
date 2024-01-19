<script lang="ts">
import { type HTMLArkProps } from '../factory'
export interface AvatarFallbackProps extends /* @vue-ignore */ HTMLArkProps<'span'> {}
// have to add the vue-ignore when using the interface as props type. https://github.com/vuejs/core/issues/8286#issuecomment-1545659320
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useAvatarContext } from './avatar-context'

defineProps<AvatarFallbackProps>()
const slots = defineSlots<{
  default(): any
}>()

const api = useAvatarContext()
</script>

<template>
  <ark.span v-bind="api.fallbackProps">
    <slot v-if="slots.default()" />
  </ark.span>
</template>
