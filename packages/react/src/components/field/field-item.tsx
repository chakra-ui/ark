'use client'

import type { ItemProps } from '@zag-js/field'
import { type PropsWithChildren, useMemo } from 'react'
import type { UseFieldContext } from './use-field-context.ts'
import { FieldProvider, useFieldContext } from './use-field-context.ts'

export interface FieldItemBaseProps {
  value: string
}

export interface FieldItemProps extends PropsWithChildren<FieldItemBaseProps> {}

export const FieldItem = (props: FieldItemProps) => {
  const { value, children } = props
  const parentField = useFieldContext()

  const itemField = useMemo<UseFieldContext>(() => {
    if (!parentField) {
      throw new Error('Field.Item must be used within Field.Root')
    }

    const control = parentField.getItemControlId(value)
    const label = `${control}:label`
    const item = (props?: ItemProps) => ({ item: value, ...props })

    return {
      ...parentField,
      ids: { ...parentField.ids, control, label },
      getLabelProps: (props) => ({ ...parentField.getLabelProps(item(props)), id: label }),
      getControlProps: (props) => parentField.getControlProps(item(props)),
      getInputProps: (props) => parentField.getInputProps(item(props)),
      getTextareaProps: (props) => parentField.getTextareaProps(item(props)),
      getSelectProps: (props) => parentField.getSelectProps(item(props)),
    }
  }, [parentField, value])

  return <FieldProvider value={itemField}>{children}</FieldProvider>
}

FieldItem.displayName = 'FieldItem'
