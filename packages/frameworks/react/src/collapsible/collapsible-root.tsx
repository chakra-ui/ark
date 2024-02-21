import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { type Assign } from '../types'
import { CollapsibleProvider } from './collapsible-context'
import { splitCollapsibleProps } from './split-collapsible-props'
import { useCollapsible, type UseCollapsibleProps } from './use-collapsible'

export interface CollapsibleRootProps extends Assign<HTMLArkProps<'div'>, UseCollapsibleProps> {}

export const CollapsibleRoot = forwardRef<HTMLDivElement, CollapsibleRootProps>((props, ref) => {
  const [useCollapsibleProps, localProps] = splitCollapsibleProps(props)
  const api = useCollapsible(useCollapsibleProps)
  const mergedProps = mergeProps(api.rootProps, localProps)

  return (
    <CollapsibleProvider value={api}>
      <ark.div {...mergedProps} ref={ref} />
    </CollapsibleProvider>
  )
})

CollapsibleRoot.displayName = 'CollapsibleRoot'
