import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { type Assign } from '../types'
import { splitCollapsibleProps } from './split-collapsible-props'
import { useCollapsible, type UseCollapsibleProps } from './use-collapsible'
import { CollapsibleProvider } from './use-collapsible-context'

export interface CollapsibleRootProps extends Assign<HTMLArkProps<'div'>, UseCollapsibleProps> {}

export const CollapsibleRoot = forwardRef<HTMLDivElement, CollapsibleRootProps>((props, ref) => {
  const [useCollapsibleProps, localProps] = splitCollapsibleProps(props)
  const context = useCollapsible(useCollapsibleProps)
  const mergedProps = mergeProps(context.rootProps, localProps)

  return (
    <CollapsibleProvider value={context}>
      <ark.div {...mergedProps} ref={ref} />
    </CollapsibleProvider>
  )
})

CollapsibleRoot.displayName = 'CollapsibleRoot'
