import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLArkProps, ark } from '~/factory'
import { useCollapsibleContext } from './use-collapsible-context'

export interface CollapsibleTriggerProps extends HTMLArkProps<'button'> {}

export const CollapsibleTrigger = forwardRef<HTMLButtonElement, CollapsibleTriggerProps>(
  (props, ref) => {
    const collapsible = useCollapsibleContext()
    const mergedProps = mergeProps(collapsible.triggerProps, props)

    return <ark.button {...mergedProps} ref={ref} />
  },
)

CollapsibleTrigger.displayName = 'CollapsibleTrigger'
