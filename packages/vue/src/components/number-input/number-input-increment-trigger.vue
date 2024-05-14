<script lang="ts">
import type { PolymorphicProps } from '../factory'

export interface NumberInputIncrementTriggerProps extends PolymorphicProps {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useNumberInputContext } from './use-number-input-context'

defineProps<NumberInputIncrementTriggerProps>()
const numberInput = useNumberInputContext()
</script>

<template>
  <ark.button v-bind="numberInput.incrementTriggerProps" :as-child="asChild">
    <slot />
  </ark.button>
</template>
