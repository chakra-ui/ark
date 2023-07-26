import { mergeProps } from '@zag-js/react'
import { type ReactNode } from 'react'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import { forwardRef } from '../forward-ref'
import { runIfFn } from '../run-if-fn'
import { type Assign } from '../types'
import { EditableProvider, type EditableContext } from './editable-context'
import { useEditable, type UseEditableProps } from './use-editable'

export type EditableProps = Assign<
  Omit<HTMLArkProps<'div'>, 'children'> & {
    children: ReactNode | ((pages: EditableContext) => ReactNode)
  },
  UseEditableProps
>

export const Editable = forwardRef<'div', EditableProps>((props, ref) => {
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
      'onCancel',
      'onChange',
      'onEdit',
      'onInteractOutside',
      'onSubmit',
      'placeholder',
      'readOnly',
      'selectOnFocus',
      'startWithEditView',
      'submitMode',
      'translations',
      'value',
    ],
  )
  const editable = useEditable(useEditableProps)
  const mergedProps = mergeProps(editable.rootProps, divProps)

  const view = runIfFn(children, editable)

  return (
    <EditableProvider value={editable}>
      <ark.div {...mergedProps} ref={ref}>
        {view}
      </ark.div>
    </EditableProvider>
  )
})
