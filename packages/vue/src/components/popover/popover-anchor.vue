<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface PopoverAnchorBaseProps extends PolymorphicProps {}
export interface PopoverAnchorProps
  extends PopoverAnchorBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { usePopoverContext } from './use-popover-context'
import { useForwardExpose } from '../../utils'

defineProps<PopoverAnchorProps>()
const popover = usePopoverContext()

useForwardExpose()
</script>

<template>
  <ark.div v-bind="popover.getAnchorProps()" :as-child="asChild">
    <slot />
  </ark.div>
</template>
