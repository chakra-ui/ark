<script lang="ts">
import type { PolimoprhicProps } from '../factory'

export interface NumberInputLabelProps extends PolimoprhicProps {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useNumberInputContext } from './use-number-input-context'

defineProps<NumberInputLabelProps>()
const numberInput = useNumberInputContext()
</script>

<template>
  <ark.label v-bind="numberInput.labelProps" :as-child="asChild">
    <slot />
  </ark.label>
</template>
