import { mergeProps } from '@zag-js/react'
import { forwardRef, type ComponentPropsWithoutRef } from 'react'
import { ark } from '../factory'
import { usePopoverContext } from './popover-context'

export type PopoverDescriptionProps = ComponentPropsWithoutRef<typeof ark.div>

export const PopoverDescription = forwardRef<HTMLParagraphElement, PopoverDescriptionProps>(
  (props, ref) => {
    const { descriptionProps } = usePopoverContext()
    const mergedProps = mergeProps(descriptionProps, props)

    return <ark.p {...mergedProps} ref={ref} />
  },
)

PopoverDescription.displayName = 'PopoverDescription'
