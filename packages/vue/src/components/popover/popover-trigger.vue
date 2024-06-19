<script lang="ts">
import type { ButtonHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface PopoverTriggerBaseProps extends PolymorphicProps {}
export interface PopoverTriggerProps
  extends PopoverTriggerBaseProps,
    /**
     * @vue-ignore
     */
    ButtonHTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { usePopoverContext } from './use-popover-context'

defineProps<PopoverTriggerProps>()
const popover = usePopoverContext()
</script>

<template>
  <ark.button v-bind="popover.getTriggerProps()" :as-child="asChild">
    <slot />
  </ark.button>
</template>
