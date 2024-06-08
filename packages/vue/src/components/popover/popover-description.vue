<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface PopoverDescriptionProps
  extends PolymorphicProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { usePopoverContext } from './use-popover-context'

defineProps<PopoverDescriptionProps>()
const popover = usePopoverContext()
</script>

<template>
  <ark.div v-bind="popover.getDescriptionProps()" :as-child="asChild">
    <slot />
  </ark.div>
</template>
