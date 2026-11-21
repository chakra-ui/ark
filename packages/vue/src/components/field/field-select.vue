<script lang="ts">
import type { RootState } from '@zag-js/field'
import type { SelectHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface FieldSelectState extends RootState {}
export interface FieldSelectBaseProps extends PolymorphicProps {}
export interface FieldSelectProps
  extends
    FieldSelectBaseProps,
    /**
     * @vue-ignore
     */
    Omit<SelectHTMLAttributes, 'value'> {
  modelValue?: SelectHTMLAttributes['value']
}
</script>

<script setup lang="ts">
import { type PolymorphicSlots, ark } from '../factory.ts'
import { useFieldContext } from './use-field-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

defineProps<FieldSelectProps & { modelValue?: string }>()
defineSlots<PolymorphicSlots<FieldSelectState>>()
const field = useFieldContext()

const emit = defineEmits(['update:modelValue'])

useForwardExpose()
</script>

<template>
  <ark.select
    v-bind="{ ...field?.getSelectProps(), ...(modelValue !== undefined ? { value: modelValue } : {}) }"
    @change="(event) => emit('update:modelValue', (event.target as HTMLSelectElement).value)"
    :state="field?.getRootState()"
    :as-child="asChild"
  >
    <template v-if="$slots.render" #render="scope">
      <slot name="render" v-bind="scope" />
    </template>
    <template v-else #default>
      <slot />
    </template>
  </ark.select>
</template>
