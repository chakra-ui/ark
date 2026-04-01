<script lang="ts">
import type { HiddenInputProps } from '@zag-js/date-input'
import type { InputHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface DateInputHiddenInputBaseProps extends PolymorphicProps, HiddenInputProps {}
export interface DateInputHiddenInputProps
  extends
    DateInputHiddenInputBaseProps,
    /**
     * @vue-ignore
     */
    InputHTMLAttributes {}
</script>

<script setup lang="ts">
import { useForwardExpose } from '../../utils/use-forward-expose'
import { ark } from '../factory'
import { useDateInputContext } from './use-date-input-context'

const props = defineProps<DateInputHiddenInputProps>()
const dateInput = useDateInputContext()

useForwardExpose()
</script>

<template>
  <ark.input v-bind="dateInput.getHiddenInputProps({ index: props.index, name: props.name })" :as-child="asChild">
    <slot />
  </ark.input>
</template>
