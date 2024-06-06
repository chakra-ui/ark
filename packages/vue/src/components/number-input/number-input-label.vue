<script lang="ts">
import type { LabelHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface NumberInputLabelProps
  extends PolymorphicProps,
    /**
     * @vue-ignore
     */
    LabelHTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useNumberInputContext } from './use-number-input-context'

defineProps<NumberInputLabelProps>()
const numberInput = useNumberInputContext()
</script>

<template>
  <ark.label v-bind="numberInput.getLabelProps()" :as-child="asChild">
    <slot />
  </ark.label>
</template>
