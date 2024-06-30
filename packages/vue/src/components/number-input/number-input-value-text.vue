<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface NumberInputValueTextBaseProps extends PolymorphicProps {}
export interface NumberInputValueTextProps
  extends NumberInputValueTextBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useNumberInputContext } from './use-number-input-context'

defineProps<NumberInputValueTextProps>()
const numberInput = useNumberInputContext()
</script>

<template>
  <ark.span v-bind="numberInput.getValueTextProps()" :as-child="asChild">
    <slot />
  </ark.span>
</template>
