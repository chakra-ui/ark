import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLArkProps, ark } from '~/factory'
import type { Assign } from '~/types'
import { splitCollapsibleProps } from './split-collapsible-props'
import { type UseCollapsibleProps, useCollapsible } from './use-collapsible'
import { CollapsibleProvider } from './use-collapsible-context'

export interface CollapsibleRootProps extends Assign<HTMLArkProps<'div'>, UseCollapsibleProps> {}

export const CollapsibleRoot = forwardRef<HTMLDivElement, CollapsibleRootProps>((props, ref) => {
  const [useCollapsibleProps, localProps] = splitCollapsibleProps(props)
  const collapsible = useCollapsible(useCollapsibleProps)
  const mergedProps = mergeProps(collapsible.rootProps, localProps)

  return (
    <CollapsibleProvider value={collapsible}>
      <ark.div {...mergedProps} ref={ref} />
    </CollapsibleProvider>
  )
})

CollapsibleRoot.displayName = 'CollapsibleRoot'
