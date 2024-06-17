import { mergeProps } from '@zag-js/solid'
import type { JSX } from 'solid-js'
import { createSplitProps } from '../../utils/create-split-props'
import { type PolymorphicProps, ark } from '../factory'
import type { UseEditableReturn } from './use-editable'
import { EditableProvider } from './use-editable-context'

interface RootProviderProps {
  value: UseEditableReturn
}

export interface EditableRootProviderBaseProps extends PolymorphicProps<'div'> {}
export interface EditableRootProviderProps
  extends JSX.HTMLAttributes<HTMLDivElement>,
    RootProviderProps,
    EditableRootProviderBaseProps {}

export const EditableRootProvider = (props: EditableRootProviderProps) => {
  const [{ value: editable }, localProps] = createSplitProps<RootProviderProps>()(props, ['value'])
  const mergedProps = mergeProps(() => editable().getRootProps(), localProps)

  return (
    <EditableProvider value={editable}>
      <ark.div {...mergedProps} />
    </EditableProvider>
  )
}
