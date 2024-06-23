<script lang="ts">
import type { InputHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface NumberInputInputBaseProps extends PolymorphicProps {}
export interface NumberInputInputProps
  extends NumberInputInputBaseProps,
    /**
     * @vue-ignore
     */
    InputHTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useNumberInputContext } from './use-number-input-context'
import { useFieldContext } from '../field'

defineProps<NumberInputInputProps>()
const numberInput = useNumberInputContext()
const field = useFieldContext()

</script>

<template>
  <ark.input :aria-describedby="field?.ariaDescribedby"  v-bind="numberInput.getInputProps()" :as-child="asChild"><slot /></ark.input>
</template>
