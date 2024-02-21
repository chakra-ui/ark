import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useCollapsibleContext } from './collapsible-context'

export interface CollapsibleContentProps extends HTMLArkProps<'div'> {}

export const CollapsibleContent = forwardRef<HTMLDivElement, CollapsibleContentProps>(
  (props, ref) => {
    const api = useCollapsibleContext()

    if (api.isUnmounted) {
      return null
    }

    const mergedProps = mergeProps(api.contentProps, props)
    return <ark.div {...mergedProps} ref={ref} />
  },
)

CollapsibleContent.displayName = 'CollapsibleContent'
