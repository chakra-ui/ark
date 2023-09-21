import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { usePopoverContext } from './popover-context'

export interface PopoverIndicatorProps extends HTMLArkProps<'div'> {}

export const PopoverIndicator = forwardRef<HTMLDivElement, PopoverIndicatorProps>((props, ref) => {
  const api = usePopoverContext()
  const mergedProps = mergeProps(api.indicatorProps, props)

  return <ark.div {...mergedProps} ref={ref} />
})

PopoverIndicator.displayName = 'PopoverIndicator'
