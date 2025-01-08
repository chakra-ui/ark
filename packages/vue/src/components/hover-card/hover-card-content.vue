<script lang="ts">
import { mergeProps } from '@zag-js/vue'
import { type HTMLAttributes, computed } from 'vue'
import type { PolymorphicProps } from '../factory'
import { usePresenceContext } from '../presence'

export interface HoverCardContentBaseProps extends PolymorphicProps {}
export interface HoverCardContentProps
  extends HoverCardContentBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
iimport { useForwardExpose } from '../../utils'
import { ark } from '../factory'
import { useHoverCardContext } from './use-hover-card-context'
defineProps<HoverCardContentProps>()

const hoverCard = useHoverCardContext()
const presence = usePresenceContext()

const mergedProps = computed(() =>
  mergeProps(hoverCard.value.getContentProps(), presence.value.presenceProps),
)

useForwardExpose()
</script>

<template>
  <ark.div v-if="!presence.unmounted" v-bind="mergedProps" :as-child="asChild">
    <slot />
  </ark.div>
</template>
