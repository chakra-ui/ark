import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { usePopoverContext } from './use-popover-context'

export interface PopoverDescriptionProps extends HTMLArkProps<'div'> {}

export const PopoverDescription = forwardRef<HTMLParagraphElement, PopoverDescriptionProps>(
  (props, ref) => {
    const popover = usePopoverContext()
    const mergedProps = mergeProps(popover.descriptionProps, props)

    return <ark.div {...mergedProps} ref={ref} />
  },
)

PopoverDescription.displayName = 'PopoverDescription'
