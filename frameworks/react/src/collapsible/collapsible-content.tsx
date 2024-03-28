import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useCollapsibleContext } from './use-collapsible-context'

export interface CollapsibleContentProps extends HTMLArkProps<'div'> {}

export const CollapsibleContent = forwardRef<HTMLDivElement, CollapsibleContentProps>(
  (props, ref) => {
    const context = useCollapsibleContext()

    if (context.isUnmounted) {
      return null
    }

    const mergedProps = mergeProps(context.contentProps, props)
    return <ark.div {...mergedProps} ref={ref} />
  },
)

CollapsibleContent.displayName = 'CollapsibleContent'
