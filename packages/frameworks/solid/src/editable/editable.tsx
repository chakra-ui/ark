import { mergeProps } from '@zag-js/solid'
import { splitProps, type JSX } from 'solid-js'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import { runIfFn } from '../run-if-fn'
import type { Assign } from '../types'
import { EditableProvider } from './editable-context'
import { useEditable, type UseEditableProps, type UseEditableReturn } from './use-editable'

export interface EditableProps
  extends Assign<
    Assign<
      HTMLArkProps<'div'>,
      {
        children?: JSX.Element | ((api: UseEditableReturn) => JSX.Element)
      }
    >,
    UseEditableProps
  > {}

export const Editable = (props: EditableProps) => {
  const [useEditableProps, restProps] = createSplitProps<UseEditableProps>()(props, [
    'activationMode',
    'autoResize',
    'dir',
    'disabled',
    'finalFocusEl',
    'form',
    'getRootNode',
    'id',
    'ids',
    'invalid',
    'maxLength',
    'name',
    'onEdit',
    'onFocusOutside',
    'onInteractOutside',
    'onPointerDownOutside',
    'onValueChange',
    'onValueCommit',
    'onValueRevert',
    'placeholder',
    'readOnly',
    'selectOnFocus',
    'startWithEditView',
    'submitMode',
    'translations',
    'value',
  ])

  const editable = useEditable(useEditableProps)

  const [childrenProps, localProps] = splitProps(restProps, ['children'])
  const mergedProps = mergeProps(() => editable().rootProps, localProps)

  const getChildren = () => runIfFn(childrenProps.children, editable)

  return (
    <EditableProvider value={editable}>
      <ark.div {...mergedProps}>{getChildren()}</ark.div>
    </EditableProvider>
  )
}
