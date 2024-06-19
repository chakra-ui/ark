import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import type { UseEditableReturn } from './use-editable'
import { EditableProvider } from './use-editable-context'

interface RootProviderProps {
  value: UseEditableReturn
}

export interface EditableRootProviderBaseProps extends RootProviderProps, PolymorphicProps {}
export interface EditableRootProviderProps
  extends HTMLProps<'div'>,
    EditableRootProviderBaseProps {}

export const EditableRootProvider = forwardRef<HTMLDivElement, EditableRootProviderProps>(
  (props, ref) => {
    const [{ value: editable }, localProps] = createSplitProps<RootProviderProps>()(props, [
      'value',
    ])
    const mergedProps = mergeProps(editable.getRootProps(), localProps)

    return (
      <EditableProvider value={editable}>
        <ark.div {...mergedProps} ref={ref} />
      </EditableProvider>
    )
  },
)

EditableRootProvider.displayName = 'EditableRootProvider'
