<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface HoverCardArrowBaseProps extends PolymorphicProps {}
export interface HoverCardArrowProps
  extends HoverCardArrowBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useHoverCardContext } from './use-hover-card-context'

defineProps<HoverCardArrowProps>()
const hoverCard = useHoverCardContext()
</script>

<template>
  <ark.div v-bind="hoverCard.getArrowProps()" :as-child="asChild">
    <slot />
  </ark.div>
</template>
