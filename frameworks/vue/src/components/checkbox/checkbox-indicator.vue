<script lang="ts">
import type { PolymorphicProps } from '../factory'

export interface CheckboxIndicatorProps extends PolymorphicProps {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useCheckboxContext } from './use-checkbox-context'

defineProps<CheckboxIndicatorProps>()
const checkbox = useCheckboxContext()
</script>

<template>
  <ark.div v-bind="checkbox.indicatorProps" :as-child="asChild">
    <slot />
  </ark.div>
</template>
