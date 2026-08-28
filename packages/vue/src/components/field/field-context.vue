<script lang="ts">
import type { SlotsType, UnwrapRef } from 'vue'
import type { UseFieldContext } from './use-field-context.ts'

export interface FieldContextProps extends SlotsType<{
  default: UnwrapRef<UseFieldContext>
}> {}
</script>

<script setup lang="ts">
import { useFieldContext } from './use-field-context.ts'

const field = useFieldContext()

defineSlots<{
  default(field: UnwrapRef<UseFieldContext>): unknown
}>()
</script>

<template>
  <slot v-bind="field"></slot>
</template>
