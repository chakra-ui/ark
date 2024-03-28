import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useCollapsibleContext } from './use-collapsible-context'

export interface CollapsibleTriggerProps extends HTMLArkProps<'button'> {}

export const CollapsibleTrigger = forwardRef<HTMLButtonElement, CollapsibleTriggerProps>(
  (props, ref) => {
    const context = useCollapsibleContext()
    const mergedProps = mergeProps(context.triggerProps, props)

    return <ark.button {...mergedProps} ref={ref} />
  },
)

CollapsibleTrigger.displayName = 'CollapsibleTrigger'
