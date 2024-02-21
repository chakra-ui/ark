import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useCollapsibleContext } from './collapsible-context'

export interface CollapsibleTriggerProps extends HTMLArkProps<'button'> {}

export const CollapsibleTrigger = forwardRef<HTMLButtonElement, CollapsibleTriggerProps>(
  (props, ref) => {
    const api = useCollapsibleContext()
    const mergedProps = mergeProps(api.triggerProps, props)

    return <ark.button {...mergedProps} ref={ref} />
  },
)

CollapsibleTrigger.displayName = 'CollapsibleTrigger'
