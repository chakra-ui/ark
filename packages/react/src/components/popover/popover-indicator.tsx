import { mergeProps } from '@zag-js/react'
import { type HTMLAttributes, forwardRef } from 'react'
import { type PolymorphicProps, ark } from '../factory'
import { usePopoverContext } from './use-popover-context'

export interface PopoverIndicatorBaseProps extends PolymorphicProps {}
export interface PopoverIndicatorProps
  extends HTMLAttributes<HTMLDivElement>,
    PopoverIndicatorBaseProps {}

export const PopoverIndicator = forwardRef<HTMLDivElement, PopoverIndicatorProps>((props, ref) => {
  const popover = usePopoverContext()
  const mergedProps = mergeProps(popover.getIndicatorProps(), props)

  return <ark.div {...mergedProps} ref={ref} />
})

PopoverIndicator.displayName = 'PopoverIndicator'
