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
import { ark } from '../factory'
import { useFieldContext } from './use-field-context'

const props = defineProps<FieldSelectProps & { modelValue?: string }>()
const field = useFieldContext()

const emit = defineEmits(['update:modelValue'])
</script>

<template>
  <ark.select
    v-bind="field.getSelectProps()"
    :value="props.modelValue"
    @change="(event) => emit('update:modelValue', (event.target as HTMLSelectElement).value)"
    :as-child="asChild"
  >
    <slot />
  </ark.select>
</template>
