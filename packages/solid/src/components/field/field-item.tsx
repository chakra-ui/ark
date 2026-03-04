import { createMemo, type JSX } from 'solid-js'
import { parts } from './field.anatomy'
import { FieldProvider, useFieldContext, type UseFieldContext } from './use-field-context'

export interface FieldItemBaseProps {
  value: string
}

export interface FieldItemProps extends FieldItemBaseProps {
  children?: JSX.Element
}

export const FieldItem = (props: FieldItemProps) => {
  const parentField = useFieldContext()

  const itemField = createMemo(() => {
    const parent = parentField?.()
    if (!parent) {
      throw new Error('Field.Item must be used within Field.Root')
    }

    const controlId = `field::${parent.ids.control}::item::${props.value}`
    const labelId = `${controlId}::label`

    const getControlProps = () => ({
      ...parent.getInputProps(),
      id: controlId,
    })

    return (() => ({
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
        ...getControlProps(),
        ...parts.input.attrs,
      }),
      getSelectProps: () => ({
        ...getControlProps(),
        ...parts.select.attrs,
      }),
      getTextareaProps: () => ({
        ...getControlProps(),
        ...parts.textarea.attrs,
      }),
    })) as UseFieldContext
  })

  return <FieldProvider value={itemField()}>{props.children}</FieldProvider>
}
