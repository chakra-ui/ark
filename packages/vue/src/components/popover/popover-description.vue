<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface PopoverDescriptionBaseProps extends PolymorphicProps {}
export interface PopoverDescriptionProps
  extends PopoverDescriptionBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { useForwardExpose } from '../../utils'
import { ark } from '../factory'
import { usePopoverContext } from './use-popover-context'

defineProps<PopoverDescriptionProps>()
const popover = usePopoverContext()

useForwardExpose()
</script>

<template>
  <ark.div v-bind="popover.getDescriptionProps()" :as-child="asChild">
    <slot />
  </ark.div>
</template>
