<script lang="ts">
import type { PolymorphicProps } from '../factory'

export interface NumberInputInputProps extends PolymorphicProps {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useNumberInputContext } from './use-number-input-context'

defineProps<NumberInputInputProps>()
const numberInput = useNumberInputContext()
</script>

<template>
  <ark.input v-bind="numberInput.inputProps" :as-child="asChild" />
</template>
