<script lang="ts">
import type { ButtonHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface NumberInputDecrementTriggerProps
  extends PolymorphicProps,
    /* @vue-ignore */ ButtonHTMLAttributes {}
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
