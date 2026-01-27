<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface PopoverPositionerBaseProps extends PolymorphicProps {}
export interface PopoverPositionerProps
  extends
    PopoverPositionerBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { useForwardExpose } from '../../utils/use-forward-expose'
import { ark } from '../factory'
import { usePresenceContext } from '../presence'
import { usePopoverContext } from './use-popover-context'

defineProps<PopoverPositionerProps>()

const popover = usePopoverContext()
const presence = usePresenceContext()

useForwardExpose()
</script>

<template>
  <ark.div v-if="!presence.unmounted" v-bind="popover.getPositionerProps()" :as-child="asChild">
    <slot />
  </ark.div>
</template>
