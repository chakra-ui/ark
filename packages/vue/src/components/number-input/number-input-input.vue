<script lang="ts">
import type { InputHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface NumberInputInputProps
  extends PolymorphicProps,
    /* @vue-ignore */ InputHTMLAttributes {}
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
