<script lang="ts">
import type { PolymorphicProps } from '../factory'

export interface SelectClearTriggerProps extends PolymorphicProps {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useSelectContext } from './use-select-context'

defineProps<SelectClearTriggerProps>()
const select = useSelectContext()
</script>

<template>
  <ark.button v-bind="select.clearTriggerProps" :as-child="asChild">
    <slot />
  </ark.button>
</template>
