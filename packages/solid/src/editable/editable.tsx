import type { Assign } from '@polymorphic-factory/solid'
import { children, JSX } from 'solid-js'
import { createSplitProps } from '../create-split-props'
import { ark, HTMLArkProps } from '../factory'
import { runIfFn } from '../run-if-fn'
import { EditableContext, EditableProvider, useEditableContext } from './editable-context'
import { useEditable, UseEditableProps } from './use-editable'

export type EditableProps = Assign<EditableContextWrapperProps, UseEditableProps>

export const Editable = (props: EditableProps) => {
  const [useEditableProps, editableContextProps] = createSplitProps<UseEditableProps>()(props, [
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
      <EditableContextWrapper {...editableContextProps} />
    </EditableProvider>
  )
}

type EditableContextWrapperProps = Assign<
  HTMLArkProps<'div'>,
  {
    children: JSX.Element | ((context: EditableContext) => JSX.Element)
  }
>

const EditableContextWrapper = (props: EditableContextWrapperProps) => {
  const editable = useEditableContext()
  const view = children(() => runIfFn(props.children, editable))

  return (
    <ark.div {...editable().rootProps} {...props}>
      {view()}
    </ark.div>
  )
}
