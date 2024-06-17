import { mergeProps } from '@zag-js/react'
import { type HTMLAttributes, forwardRef } from 'react'
import { type PolymorphicProps, ark } from '../factory'
import { useCollapsibleContext } from './use-collapsible-context'

export interface CollapsibleContentBaseProps extends PolymorphicProps {}
export interface CollapsibleContentProps
  extends HTMLAttributes<HTMLDivElement>,
    CollapsibleContentBaseProps {}

export const CollapsibleContent = forwardRef<HTMLDivElement, CollapsibleContentProps>(
  (props, ref) => {
    const collapsible = useCollapsibleContext()

    if (collapsible.isUnmounted) {
      return null
    }

    const mergedProps = mergeProps(collapsible.getContentProps(), props)
    return <ark.div {...mergedProps} ref={ref} />
  },
)

CollapsibleContent.displayName = 'CollapsibleContent'
