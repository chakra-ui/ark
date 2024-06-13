import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLArkProps, ark } from '../factory'
import { usePopoverContext } from './use-popover-context'

export type PopoverDescriptionBaseProps = {}
export interface PopoverDescriptionProps extends HTMLArkProps<'div'>, PopoverDescriptionBaseProps {}

export const PopoverDescription = forwardRef<HTMLParagraphElement, PopoverDescriptionProps>(
  (props, ref) => {
    const popover = usePopoverContext()
    const mergedProps = mergeProps(popover.getDescriptionProps(), props)

    return <ark.div {...mergedProps} ref={ref} />
  },
)

PopoverDescription.displayName = 'PopoverDescription'
