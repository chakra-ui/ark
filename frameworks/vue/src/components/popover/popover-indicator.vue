<script lang="ts">
import type { PolimoprhicProps } from '../factory'

export interface PopoverIndicatorProps extends PolimoprhicProps {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { usePopoverContext } from './use-popover-context'

defineProps<PopoverIndicatorProps>()
const popover = usePopoverContext()
</script>

<template>
  <ark.div v-bind="popover.indicatorProps" :as-child="asChild">
    <slot />
  </ark.div>
</template>
