import { forwardRef } from '@polymorphic-factory/react'
import { atlas, HTMLAtlasProps } from '../factory'
import { splitProps, type Assign } from '../split-props'
import { EditableProvider } from './editable-context'
import { useEditable, UseEditableProps } from './use-editable'

export type EditableProps = Assign<HTMLAtlasProps<'div'>, UseEditableProps>

export const Editable = forwardRef<'div', EditableProps>((props, ref) => {
  const [useEditableProps, rootPRops] = splitProps(props, [
    'activationMode',
    'autoResize',
    'defaultValue',
    'dir',
    'disabled',
    'getRootNode',
    'ids',
    'invalid',
    'maxLength',
    'name',
    'onCancel',
    'onChange',
    'onEdit',
    'onSubmit',
    'placeholder',
    'readonly',
    'selectOnFocus',
    'startWithEditView',
    'submitMode',
    'translations',
    'value',
  ])
  const editable = useEditable(useEditableProps)

  return (
    <EditableProvider value={editable}>
      <atlas.div {...editable.rootProps} {...rootPRops} ref={ref} />
    </EditableProvider>
  )
})
