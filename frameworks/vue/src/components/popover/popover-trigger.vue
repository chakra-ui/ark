<script lang="ts">
import type { PolimoprhicProps } from '../factory'

export interface PopoverTriggerProps extends PolimoprhicProps {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { usePopoverContext } from './use-popover-context'

defineProps<PopoverTriggerProps>()
const popover = usePopoverContext()
</script>

<template>
  <ark.button v-bind="popover.triggerProps" :as-child="asChild">
    <slot />
  </ark.button>
</template>
