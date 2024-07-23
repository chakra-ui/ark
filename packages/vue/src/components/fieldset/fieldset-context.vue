<script lang="ts">
import type { SlotsType, UnwrapRef } from 'vue'
import type { UseFieldsetContext } from './use-fieldset-context'

export interface FieldsetContextProps
  extends SlotsType<{
    default: UnwrapRef<UseFieldsetContext>
  }> {}
</script>

<script setup lang="ts">
import { useFieldsetContext } from './use-fieldset-context'

const fieldset = useFieldsetContext()

defineSlots<{
  default(fieldset: UnwrapRef<UseFieldsetContext>): unknown
}>()
</script>

<template>
  <slot v-bind="fieldset"></slot>
</template>
