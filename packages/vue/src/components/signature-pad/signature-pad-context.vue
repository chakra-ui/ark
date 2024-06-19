<script lang="ts">
import type { SlotsType, UnwrapRef } from 'vue'
import type { UseSignaturePadContext } from './use-signature-pad-context'

export interface SignaturePadContextProps
  extends SlotsType<{
    default: UnwrapRef<UseSignaturePadContext>
  }> {}
</script>

<script setup lang="ts">
import { useSignaturePadContext } from './use-signature-pad-context'

const signaturepad = useSignaturePadContext()

defineSlots<{
  default(signaturepad: UnwrapRef<UseSignaturePadContext>): unknown
}>()
</script>

<template>
  <slot v-bind="signaturepad"></slot>
</template>
