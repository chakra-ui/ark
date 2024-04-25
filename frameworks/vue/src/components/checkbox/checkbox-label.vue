<script lang="ts">
import type { PolimoprhicProps } from '../factory'

export interface CheckboxLabelProps extends PolimoprhicProps {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useCheckboxContext } from './use-checkbox-context'

defineProps<CheckboxLabelProps>()
const checkbox = useCheckboxContext()
</script>

<template>
  <ark.span v-bind="checkbox.labelProps" :as-child="asChild">
    <slot />
  </ark.span>
</template>
