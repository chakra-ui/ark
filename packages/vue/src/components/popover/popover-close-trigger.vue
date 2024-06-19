<script lang="ts">
import type { ButtonHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface PopoverCloseTriggerBaseProps extends PolymorphicProps {}
export interface PopoverCloseTriggerProps
  extends PopoverCloseTriggerBaseProps,
    /**
     * @vue-ignore
     */
    ButtonHTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { usePopoverContext } from './use-popover-context'

defineProps<PopoverCloseTriggerProps>()
const popover = usePopoverContext()
</script>

<template>
  <ark.button v-bind="popover.getCloseTriggerProps()" :as-child="asChild">
    <slot />
  </ark.button>
</template>
