import { mergeProps } from '@zag-js/solid'
import type { JSX } from 'solid-js'
import { createSplitProps } from '../../utils/create-split-props'
import { type PolymorphicProps, ark } from '../factory'
import type { UseCollapsibleReturn } from './use-collapsible'
import { CollapsibleProvider } from './use-collapsible-context'

interface RootProviderProps {
  value: UseCollapsibleReturn
}

export interface CollapsibleRootProviderBaseProps extends PolymorphicProps<'div'> {}
export interface CollapsibleRootProviderProps
  extends JSX.HTMLAttributes<HTMLDivElement>,
    RootProviderProps,
    CollapsibleRootProviderBaseProps {}

export const CollapsibleRootProvider = (props: CollapsibleRootProviderProps) => {
  const [{ value: collapsible }, localProps] = createSplitProps<RootProviderProps>()(props, [
    'value',
  ])
  const mergedProps = mergeProps(() => collapsible().getRootProps(), localProps)

  return (
    <CollapsibleProvider value={collapsible}>
      <ark.div {...mergedProps} />
    </CollapsibleProvider>
  )
}
