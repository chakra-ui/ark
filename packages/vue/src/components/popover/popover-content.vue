<script lang="ts">
import type { ContentState } from '@zag-js/popover'
import { mergeProps } from '@zag-js/vue'
import { type HTMLAttributes, computed } from 'vue'
import type { PolymorphicProps, PolymorphicSlots } from '../factory.ts'
import { usePresenceContext } from '../presence/index.ts'

export interface PopoverContentState extends ContentState {}
export interface PopoverContentBaseProps extends PolymorphicProps {}
export interface PopoverContentProps
  extends
    PopoverContentBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory.ts'
import { usePopoverContext } from './use-popover-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

defineProps<PopoverContentProps>()

defineSlots<PolymorphicSlots<PopoverContentState>>()

const popover = usePopoverContext()
const presence = usePresenceContext()

const mergedProps = computed(() => mergeProps(popover.value.getContentProps(), presence.value.presenceProps))

useForwardExpose()
</script>

<template>
  <ark.div v-if="!presence.unmounted" v-bind="mergedProps" :as-child="asChild" :state="popover.getContentState()">
    <template v-if="$slots.render" #render="scope">
      <slot name="render" v-bind="scope" />
    </template>
    <template v-else #default>
      <slot />
    </template>
  </ark.div>
</template>
