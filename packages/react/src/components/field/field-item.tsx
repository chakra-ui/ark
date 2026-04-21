'use client'

import { useMemo, type PropsWithChildren } from 'react'
import type { HTMLProps } from '../factory'
import { parts } from './field.anatomy'
import { FieldProvider, useFieldContext } from './use-field-context'

export interface FieldItemBaseProps {
  value: string
}

export interface FieldItemProps extends PropsWithChildren<FieldItemBaseProps> {}

export const FieldItem = (props: FieldItemProps) => {
  const { value, children } = props
  const parentField = useFieldContext()

  const itemField = useMemo(() => {
    if (!parentField) {
      throw new Error('Field.Item must be used within Field.Root')
    }

    const controlId = `field::${parentField.ids.control}::item::${value}`
    const labelId = `${controlId}::label`

    const getControlProps = () =>
      ({
        ...parentField.getInputProps(),
        id: controlId,
      }) as HTMLProps<'input'>

    return {
      ...parentField,
      ids: {
        ...parentField.ids,
        control: controlId,
        label: labelId,
      },
      getLabelProps: () =>
        ({
          ...parentField.getLabelProps(),
          id: labelId,
          htmlFor: controlId,
        }) as HTMLProps<'label'>,
      getInputProps: () =>
        ({
          ...getControlProps(),
          ...parts.input.attrs,
        }) as HTMLProps<'input'>,
      getSelectProps: () =>
        ({
          ...getControlProps(),
          ...parts.select.attrs,
        }) as HTMLProps<'select'>,
      getTextareaProps: () =>
        ({
          ...getControlProps(),
          ...parts.textarea.attrs,
        }) as HTMLProps<'textarea'>,
    }
  }, [parentField, value])

  return <FieldProvider value={itemField}>{children}</FieldProvider>
}

FieldItem.displayName = 'FieldItem'
