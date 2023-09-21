import { mergeProps } from '@zag-js/react'
import { forwardRef, type ReactNode } from 'react'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import { runIfFn } from '../run-if-fn'
import { type Assign } from '../types'
import { EditableProvider, type EditableContext } from './editable-context'
import { useEditable, type UseEditableProps } from './use-editable'

export interface EditableProps
  extends Assign<
    Omit<HTMLArkProps<'div'>, 'children'> & {
      children?: ReactNode | ((pages: EditableContext) => ReactNode)
    },
    UseEditableProps
  > {}

export const Editable = forwardRef<HTMLDivElement, EditableProps>((props, ref) => {
  const [useEditableProps, { children, ...divProps }] = createSplitProps<UseEditableProps>()(
    props,
    [
      'activationMode',
      'autoResize',
      'defaultValue',
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
    ],
  )
  const api = useEditable(useEditableProps)
  const mergedProps = mergeProps(api.rootProps, divProps)

  const view = runIfFn(children, api)

  return (
    <EditableProvider value={api}>
      <ark.div {...mergedProps} ref={ref}>
        {view}
      </ark.div>
    </EditableProvider>
  )
})

Editable.displayName = 'Editable'
