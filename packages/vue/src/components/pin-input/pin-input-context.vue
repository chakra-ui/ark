<script lang="ts">
import type { SlotsType, UnwrapRef } from 'vue'
import type { UsePinInputContext } from './use-pin-input-context'

export interface PinInputContextProps
  extends SlotsType<{
    default: UnwrapRef<UsePinInputContext>
  }> {}
</script>

<script setup lang="ts">
import { usePinInputContext } from './use-pin-input-context'

const pinInput = usePinInputContext()

defineSlots<{
  default(pinInput: UnwrapRef<UsePinInputContext>): unknown
}>()
</script>

<template>
  <slot v-bind="pinInput"></slot>
</template>
