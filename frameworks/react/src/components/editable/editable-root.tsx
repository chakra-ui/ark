import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import type { Assign } from '../../types'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLArkProps, ark } from '../factory'
import { type UseEditableProps, useEditable } from './use-editable'
import { EditableProvider } from './use-editable-context'

export interface EditableRootProps extends Assign<HTMLArkProps<'div'>, UseEditableProps> {}

export const EditableRoot = forwardRef<HTMLDivElement, EditableRootProps>((props, ref) => {
  const [useEditableProps, localProps] = createSplitProps<UseEditableProps>()(props, [
    'activationMode',
    'autoResize',
    'defaultValue',

    'disabled',
    'finalFocusEl',
    'form',

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
  const mergedProps = mergeProps(editable.rootProps, localProps)

  return (
    <EditableProvider value={editable}>
      <ark.div {...mergedProps} ref={ref} />
    </EditableProvider>
  )
})

EditableRoot.displayName = 'EditableRoot'
