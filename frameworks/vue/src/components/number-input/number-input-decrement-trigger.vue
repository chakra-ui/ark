<script lang="ts">
import type { PolimoprhicProps } from '../factory'

export interface NumberInputDecrementTriggerProps extends PolimoprhicProps {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useNumberInputContext } from './use-number-input-context'

defineProps<NumberInputDecrementTriggerProps>()
const numberInput = useNumberInputContext()
</script>

<template>
  <ark.button v-bind="numberInput.decrementTriggerProps" :as-child="asChild">
    <slot />
  </ark.button>
</template>
