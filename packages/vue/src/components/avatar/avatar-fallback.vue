<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface AvatarFallbackBaseProps extends PolymorphicProps {}
export interface AvatarFallbackProps
  extends AvatarFallbackBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { useForwardExpose } from '../../utils'
import { ark } from '../factory'
import { useAvatarContext } from './use-avatar-context'

defineProps<AvatarFallbackProps>()
const avatar = useAvatarContext()
useForwardExpose()
</script>

<template>
  <ark.span v-bind="avatar.getFallbackProps()" :as-child="asChild">
    <slot />
  </ark.span>
</template>
