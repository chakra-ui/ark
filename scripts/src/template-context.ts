export const contextTemplate = `<script lang="ts">
import type { SlotsType, UnwrapRef } from 'vue'
import type { Use{{ PascalCaseComponent }}Context } from './use-{{ CamelCaseComponent }}-context'

export interface {{ PascalCaseComponent }}ContextProps
  extends SlotsType<{
    default: UnwrapRef<Use{{ PascalCaseComponent }}Context>
  }> {}
</script>

<script setup lang="ts">
import { use{{ PascalCaseComponent }}Context } from './use-{{ CamelCaseComponent }}-context'

const {{ CamelCaseComponent }} = use{{ PascalCaseComponent }}Context()

defineSlots<{
  default({{ CamelCaseComponent }}: UnwrapRef<Use{{ PascalCaseComponent }}Context>): unknown
}>()
</script>

<template>
  <slot v-bind="{{ CamelCaseComponent }}"></slot>
</template>

`
