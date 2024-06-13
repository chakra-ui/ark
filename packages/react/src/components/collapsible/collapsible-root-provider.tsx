import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLArkProps, ark } from '../factory'
import type { UseCollapsibleReturn } from './use-collapsible'
import { CollapsibleProvider } from './use-collapsible-context'

export interface CollapsibleRootProviderBaseProps {
  value: UseCollapsibleReturn
}
export interface CollapsibleRootProviderProps
  extends HTMLArkProps<'div'>,
    CollapsibleRootProviderBaseProps {}

export const CollapsibleRootProvider = forwardRef<HTMLDivElement, CollapsibleRootProviderProps>(
  (props, ref) => {
    const [{ value: collapsible }, localProps] =
      createSplitProps<CollapsibleRootProviderBaseProps>()(props, ['value'])
    const mergedProps = mergeProps(collapsible.getRootProps(), localProps)

    return (
      <CollapsibleProvider value={collapsible}>
        <ark.div {...mergedProps} ref={ref} />
      </CollapsibleProvider>
    )
  },
)

CollapsibleRootProvider.displayName = 'CollapsibleRootProvider'
