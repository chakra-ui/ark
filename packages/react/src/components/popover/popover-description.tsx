import { mergeProps } from '@zag-js/react'
import { type HTMLAttributes, forwardRef } from 'react'
import { type PolymorphicProps, ark } from '../factory'
import { usePopoverContext } from './use-popover-context'

export interface PopoverDescriptionBaseProps extends PolymorphicProps {}
export interface PopoverDescriptionProps
  extends HTMLAttributes<HTMLDivElement>,
    PopoverDescriptionBaseProps {}

export const PopoverDescription = forwardRef<HTMLParagraphElement, PopoverDescriptionProps>(
  (props, ref) => {
    const popover = usePopoverContext()
    const mergedProps = mergeProps(popover.getDescriptionProps(), props)

    return <ark.div {...mergedProps} ref={ref} />
  },
)

PopoverDescription.displayName = 'PopoverDescription'
