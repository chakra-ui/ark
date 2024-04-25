<script lang="ts">
import type { SlotsType, UnwrapRef } from 'vue'
import type { UsePopoverContext } from './use-popover-context'

export interface PopoverContextProps
  extends SlotsType<{
    default: UnwrapRef<UsePopoverContext>
  }> {}
</script>

<script setup lang="ts">
import { usePopoverContext } from './use-popover-context'

const popover = usePopoverContext()

defineSlots<{
  default(popover: UnwrapRef<UsePopoverContext>): unknown
}>()
</script>

<template>
  <slot v-bind="popover"></slot>
</template>
