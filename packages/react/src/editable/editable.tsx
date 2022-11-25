import { forwardRef } from '@polymorphic-factory/react'
import { mergeProps } from '@zag-js/react'
import { createSplitProps } from '../create-split-props'
import { ark, HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { EditableProvider } from './editable-context'
import { useEditable, UseEditableProps } from './use-editable'

export type EditableProps = Assign<HTMLArkProps<'div'>, UseEditableProps>

export const Editable = forwardRef<'div', EditableProps>((props, ref) => {
  const [useEditableProps, divProps] = createSplitProps<UseEditableProps>()(props, [
    'activationMode',
    'autoResize',
    'defaultValue',
    'dir',
    'disabled',
    'form',
    'getRootNode',
    'id',
    'ids',
    'invalid',
    'maxLength',
    'name',
    'onCancel',
    'onChange',
    'onEdit',
    'onSubmit',
    'placeholder',
    'readOnly',
    'selectOnFocus',
    'startWithEditView',
    'submitMode',
    'translations',
    'value',
  ])
  const editable = useEditable(useEditableProps)
  const mergedProps = mergeProps(editable.rootProps, divProps)

  return (
    <EditableProvider value={editable}>
      <ark.div {...mergedProps} ref={ref} />
    </EditableProvider>
  )
})
