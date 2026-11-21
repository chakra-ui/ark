<script lang="ts">
export interface FieldItemBaseProps {
  value: string
}

export interface FieldItemProps extends FieldItemBaseProps {}
</script>

<script setup lang="ts">
import type { ItemProps } from '@zag-js/field'
import { computed, toValue } from 'vue'
import { FieldProvider, useFieldContext } from './use-field-context.ts'

const props = defineProps<FieldItemProps>()
const parentField = useFieldContext()

const itemField = computed(() => {
  const parent = toValue(parentField)
  if (!parent) {
    throw new Error('Field.Item must be used within Field.Root')
  }

  const control = parent.getItemControlId(props.value)
  const label = `${control}:label`
  const item = (itemProps?: ItemProps) => ({ item: props.value, ...itemProps })

  return {
    ...parent,
    ids: { ...parent.ids, control, label },
    getLabelProps: (itemProps?: ItemProps) => ({ ...parent.getLabelProps(item(itemProps)), id: label }),
    getControlProps: (itemProps?: ItemProps) => parent.getControlProps(item(itemProps)),
    getInputProps: (itemProps?: ItemProps) => parent.getInputProps(item(itemProps)),
    getTextareaProps: (itemProps?: ItemProps) => parent.getTextareaProps(item(itemProps)),
    getSelectProps: (itemProps?: ItemProps) => parent.getSelectProps(item(itemProps)),
  }
})

FieldProvider(itemField)
</script>

<template>
  <slot />
</template>
