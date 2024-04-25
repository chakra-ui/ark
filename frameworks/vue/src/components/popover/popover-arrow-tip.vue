<script lang="ts">
import type { PolimoprhicProps } from '../factory'

export interface PopoverArrowTipProps extends PolimoprhicProps {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { usePopoverContext } from './use-popover-context'

defineProps<PopoverArrowTipProps>()
const popover = usePopoverContext()
</script>

<template>
  <ark.div v-bind="popover.arrowTipProps" :as-child="asChild">
    <slot />
  </ark.div>
</template>
