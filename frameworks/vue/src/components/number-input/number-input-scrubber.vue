<script lang="ts">
import type { PolimoprhicProps } from '../factory'

export interface NumberInputScrubberProps extends PolimoprhicProps {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useNumberInputContext } from './use-number-input-context'

defineProps<NumberInputScrubberProps>()
const numberInput = useNumberInputContext()
</script>

<template>
  <ark.div v-bind="numberInput.scrubberProps" :as-child="asChild">
    <slot />
  </ark.div>
</template>
