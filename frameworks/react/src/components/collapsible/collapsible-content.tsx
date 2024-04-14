import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLArkProps, ark } from '../factory'
import { useCollapsibleContext } from './use-collapsible-context'

export interface CollapsibleContentProps extends HTMLArkProps<'div'> {}

export const CollapsibleContent = forwardRef<HTMLDivElement, CollapsibleContentProps>(
  (props, ref) => {
    const collapsible = useCollapsibleContext()

    if (collapsible.isUnmounted) {
      return null
    }

    const mergedProps = mergeProps(collapsible.contentProps, props)
    return <ark.div {...mergedProps} ref={ref} />
  },
)

CollapsibleContent.displayName = 'CollapsibleContent'
