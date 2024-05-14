<script lang="ts">
import type { PolymorphicProps } from '../factory'

export interface RadioGroupIndicatorProps extends PolymorphicProps {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useRadioGroupContext } from './use-radio-group-context'

defineProps<RadioGroupIndicatorProps>()
const radioGroup = useRadioGroupContext()
</script>

<template>
  <ark.div v-bind="radioGroup.indicatorProps" :as-child="asChild">
    <slot />
  </ark.div>
</template>
