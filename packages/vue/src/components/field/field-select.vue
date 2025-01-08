<script lang="ts">
import type { SelectHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface FieldSelectBaseProps extends PolymorphicProps {}
export interface FieldSelectProps
  extends FieldSelectBaseProps,
    /**
     * @vue-ignore
     */
    Omit<SelectHTMLAttributes, 'value'> {
  modelValue?: SelectHTMLAttributes['value']
}
</script>

<script setup lang="ts">
import { useForwardExpose } from '../../utils'
import { ark } from '../factory'
import { useFieldContext } from './use-field-context'

defineProps<FieldSelectProps & { modelValue?: string }>()
const field = useFieldContext()

const emit = defineEmits(['update:modelValue'])

useForwardExpose()
</script>

<template>
  <ark.select
    v-bind="field.getSelectProps()"
    :value="modelValue"
    @change="(event) => emit('update:modelValue', (event.target as HTMLSelectElement).value)"
    :as-child
  >
    <slot />
  </ark.select>
</template>
