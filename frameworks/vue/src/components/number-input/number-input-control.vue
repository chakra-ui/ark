<script lang="ts">
import type { PolimoprhicProps } from '../factory'

export interface NumberInputControlProps extends PolimoprhicProps {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useNumberInputContext } from './use-number-input-context'

defineProps<NumberInputControlProps>()
const numberInput = useNumberInputContext()
</script>

<template>
  <ark.div v-bind="numberInput.controlProps" :as-child="asChild">
    <slot />
  </ark.div>
</template>
