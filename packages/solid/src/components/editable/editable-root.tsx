import { mergeProps } from '@zag-js/solid'
import type { JSX } from 'solid-js'
import { createSplitProps } from '../../utils/create-split-props'
import { type PolymorphicProps, ark } from '../factory'
import { type UseEditableProps, useEditable } from './use-editable'
import { EditableProvider } from './use-editable-context'

export interface EditableRootBaseProps extends UseEditableProps, PolymorphicProps<'div'> {}
export interface EditableRootProps
  extends JSX.HTMLAttributes<HTMLDivElement>,
    EditableRootBaseProps {}

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
