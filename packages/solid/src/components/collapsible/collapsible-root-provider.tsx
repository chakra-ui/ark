import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../../utils/create-split-props.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import type { UseCollapsibleReturn } from './use-collapsible.ts'
import { CollapsibleProvider } from './use-collapsible-context.ts'

interface RootProviderProps {
  value: UseCollapsibleReturn
}

export interface CollapsibleRootProviderBaseProps extends PolymorphicProps<'div'> {}
export interface CollapsibleRootProviderProps
  extends HTMLProps<'div'>, RootProviderProps, CollapsibleRootProviderBaseProps {}

export const CollapsibleRootProvider = (props: CollapsibleRootProviderProps) => {
  const [{ value: collapsible }, localProps] = createSplitProps<RootProviderProps>()(props, ['value'])
  const mergedProps = mergeProps(() => collapsible().getRootProps(), localProps)

  return (
    <CollapsibleProvider value={collapsible}>
      <ark.div {...mergedProps} />
    </CollapsibleProvider>
  )
}
