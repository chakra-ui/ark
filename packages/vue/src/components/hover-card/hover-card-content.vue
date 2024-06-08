<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface HoverCardContentProps
  extends PolymorphicProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useHoverCardContext } from './use-hover-card-context'

defineProps<HoverCardContentProps>()
const hoverCard = useHoverCardContext()
</script>

<template>
  <ark.div v-bind="hoverCard.getContentProps()" :as-child="asChild">
    <slot />
  </ark.div>
</template>
