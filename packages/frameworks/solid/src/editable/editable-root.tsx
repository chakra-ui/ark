import { mergeProps } from '@zag-js/solid'
import { type JSX } from 'solid-js'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import { runIfFn } from '../run-if-fn'
import type { Assign } from '../types'
import { EditableProvider } from './editable-context'
import { useEditable, type UseEditableProps, type UseEditableReturn } from './use-editable'

interface ElementProps extends UseEditableProps {
  children?: JSX.Element | ((api: UseEditableReturn) => JSX.Element)
}

export interface EditableRootProps extends Assign<HTMLArkProps<'div'>, ElementProps> {}

export const EditableRoot = (props: EditableRootProps) => {
  const [useEditableProps, localProps] = createSplitProps<UseEditableProps>()(props, [
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

  const api = useEditable(useEditableProps)
  const mergedProps = mergeProps(() => api().rootProps, localProps)
  const getChildren = () => runIfFn(localProps.children, api)

  return (
    <EditableProvider value={api}>
      <ark.div {...mergedProps}>{getChildren()}</ark.div>
    </EditableProvider>
  )
}
