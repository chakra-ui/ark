import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { splitCollapsibleProps } from './split-collapsible-props'
import { type UseCollapsibleProps, useCollapsible } from './use-collapsible'
import { CollapsibleProvider } from './use-collapsible-context'

export interface CollapsibleRootBaseProps extends UseCollapsibleProps, PolymorphicProps {}
export interface CollapsibleRootProps extends HTMLProps<'div'>, CollapsibleRootBaseProps {}

export const CollapsibleRoot = forwardRef<HTMLDivElement, CollapsibleRootProps>((props, ref) => {
  const [useCollapsibleProps, localProps] = splitCollapsibleProps(props)
  const collapsible = useCollapsible(useCollapsibleProps)
  const mergedProps = mergeProps(collapsible.getRootProps(), localProps)

  return (
    <CollapsibleProvider value={collapsible}>
      <ark.div {...mergedProps} ref={ref} />
    </CollapsibleProvider>
  )
})

CollapsibleRoot.displayName = 'CollapsibleRoot'
