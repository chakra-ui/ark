'use client'

import { useMemo, type PropsWithChildren } from 'react'
import type { HTMLProps } from '../factory.ts'
import { parts } from './field.anatomy.ts'
import { FieldProvider, useFieldContext } from './use-field-context.ts'

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

    const getControlProps = (getParentProps: () => Record<string, unknown>) =>
      ({
        ...getParentProps(),
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
          ...getControlProps(parentField.getInputProps),
          ...parts.input.attrs(controlId),
        }) as HTMLProps<'input'>,
      getSelectProps: () =>
        ({
          ...getControlProps(parentField.getSelectProps),
          ...parts.select.attrs(controlId),
        }) as HTMLProps<'select'>,
      getTextareaProps: () =>
        ({
          ...getControlProps(parentField.getTextareaProps),
          ...parts.textarea.attrs(controlId),
        }) as HTMLProps<'textarea'>,
    }
  }, [parentField, value])

  return <FieldProvider value={itemField}>{children}</FieldProvider>
}

FieldItem.displayName = 'FieldItem'
