<script lang="ts">
import type { PolimoprhicProps } from '../factory'

export interface PopoverArrowProps extends PolimoprhicProps {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { usePopoverContext } from './use-popover-context'

defineProps<PopoverArrowProps>()
const popover = usePopoverContext()
</script>

<template>
  <ark.div v-bind="popover.arrowProps" :as-child="asChild">
    <slot />
  </ark.div>
</template>
