<script lang="ts">
import type { InputHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface DateInputHiddenInputBaseProps extends PolymorphicProps {}
export interface DateInputHiddenInputProps
  extends
    DateInputHiddenInputBaseProps,
    /**
     * @vue-ignore
     */
    InputHTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useDateInputContext } from './use-date-input-context'
import { useFieldContext } from '../field'
import { useForwardExpose } from '../../utils/use-forward-expose'

defineProps<DateInputHiddenInputProps>()
const dateInput = useDateInputContext()
const field = useFieldContext()

useForwardExpose()
</script>

<template>
  <ark.input :aria-describedby="field?.ariaDescribedby" v-bind="dateInput.getHiddenInputProps()" :as-child="asChild">
    <slot />
  </ark.input>
</template>
