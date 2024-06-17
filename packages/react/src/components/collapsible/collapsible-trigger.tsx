import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useCollapsibleContext } from './use-collapsible-context'

export interface CollapsibleTriggerBaseProps extends PolymorphicProps {}
export interface CollapsibleTriggerProps extends HTMLProps<'button'>, CollapsibleTriggerBaseProps {}

export const CollapsibleTrigger = forwardRef<HTMLButtonElement, CollapsibleTriggerProps>(
  (props, ref) => {
    const collapsible = useCollapsibleContext()
    const mergedProps = mergeProps(collapsible.getTriggerProps(), props)

    return <ark.button {...mergedProps} ref={ref} />
  },
)

CollapsibleTrigger.displayName = 'CollapsibleTrigger'
