import { mergeProps } from '@zag-js/solid'
import type { Assign } from '../../types'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLArkProps, ark } from '../factory'
import { type UseEditableProps, useEditable } from './use-editable'
import { EditableProvider } from './use-editable-context'

export interface EditableRootProps extends Assign<HTMLArkProps<'div'>, UseEditableProps> {}

export const EditableRoot = (props: EditableRootProps) => {
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

  const api = useEditable(useEditableProps)
  const mergedProps = mergeProps(() => api().getRootProps(), localProps)

  return (
    <EditableProvider value={api}>
      <ark.div {...mergedProps} />
    </EditableProvider>
  )
}
