import type { Assign } from '@polymorphic-factory/solid'
import { createSplitProps } from '../create-split-props'
import { ark, HTMLArkProps } from '../factory'
import { EditableProvider } from './editable-context'
import { useEditable, UseEditableProps } from './use-editable'

export type EditableProps = Assign<HTMLArkProps<'div'>, UseEditableProps>

export const Editable = (props: EditableProps) => {
  const [useEditableProps, divProps] = createSplitProps<UseEditableProps>()(props, [
    'activationMode',
    'autoResize',
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

  return (
    <EditableProvider value={editable}>
      <ark.div {...editable().rootProps} {...divProps} />
    </EditableProvider>
  )
}
