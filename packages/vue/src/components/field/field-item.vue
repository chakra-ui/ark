<script lang="ts">
export interface FieldItemBaseProps {
  value: string
}

export interface FieldItemProps extends FieldItemBaseProps {}
</script>

<script setup lang="ts">
import { computed, toValue } from 'vue'
import { parts } from './field.anatomy.ts'
import { FieldProvider, useFieldContext } from './use-field-context.ts'

const props = defineProps<FieldItemProps>()
const parentField = useFieldContext()

const itemField = computed(() => {
  const parent = toValue(parentField)
  if (!parent) {
    throw new Error('Field.Item must be used within Field.Root')
  }

  const controlId = `field::${parent.ids.control}::item::${props.value}`
  const labelId = `${controlId}::label`

  const getControlProps = <T extends Record<string, unknown>>(getParentProps: () => T) => ({
    ...getParentProps(),
    id: controlId,
  })

  return {
    ...parent,
    ids: {
      ...parent.ids,
      control: controlId,
      label: labelId,
    },
    getLabelProps: () => ({
      ...parent.getLabelProps(),
      id: labelId,
      htmlFor: controlId,
    }),
    getInputProps: () => ({
      ...getControlProps(parent.getInputProps),
      ...parts.input.attrs(controlId),
    }),
    getSelectProps: () => ({
      ...getControlProps(parent.getSelectProps),
      ...parts.select.attrs(controlId),
    }),
    getTextareaProps: () => ({
      ...getControlProps(parent.getTextareaProps),
      ...parts.textarea.attrs(controlId),
    }),
  }
})

FieldProvider(itemField)
</script>

<template>
  <slot />
</template>
