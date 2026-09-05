<script lang="ts">
import type { HiddenInputProps } from '@zag-js/date-input'
import type { InputHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

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
import { useForwardExpose } from '../../utils/use-forward-expose.ts'
import { ark } from '../factory.ts'
import { useDateInputContext } from './use-date-input-context.ts'

const props = defineProps<DateInputHiddenInputProps>()
const dateInput = useDateInputContext()

useForwardExpose()
</script>

<template>
  <ark.input v-bind="dateInput.getHiddenInputProps({ index: props.index, name: props.name })" :as-child="asChild">
    <template v-if="$slots.render" #render="scope">
      <slot name="render" v-bind="scope" />
    </template>
    <template v-else #default>
      <slot />
    </template>
  </ark.input>
</template>
