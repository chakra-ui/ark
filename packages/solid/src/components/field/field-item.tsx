import type { ItemProps } from '@zag-js/field'
import type { JSX } from '@solidjs/web'
import { createMemo } from 'solid-js'
import { FieldProvider, type UseFieldContext, useFieldContext } from './use-field-context.ts'

export interface FieldItemBaseProps {
  value: string
}

export interface FieldItemProps extends FieldItemBaseProps {
  children?: JSX.Element
}

export const FieldItem = (props: FieldItemProps) => {
  const parentField = useFieldContext()

  const itemField: UseFieldContext = createMemo(() => {
    const parent = parentField?.()
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

  return <FieldProvider value={itemField}>{props.children}</FieldProvider>
}
