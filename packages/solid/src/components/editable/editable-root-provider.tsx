import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLArkProps, ark } from '../factory'
import type { UseEditableReturn } from './use-editable'
import { EditableProvider } from './use-editable-context'

interface RootProviderProps {
  value: UseEditableReturn
}

export interface EditableRootProviderProps extends HTMLArkProps<'div'>, RootProviderProps {}

export const EditableRootProvider = (props: EditableRootProviderProps) => {
  const [{ value: editable }, localProps] = createSplitProps<RootProviderProps>()(props, ['value'])
  const mergedProps = mergeProps(() => editable().getRootProps(), localProps)

  return (
    <EditableProvider value={editable}>
      <ark.div {...mergedProps} />
    </EditableProvider>
  )
}
